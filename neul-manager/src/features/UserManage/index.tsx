import { useEffect, useState } from "react";
import clsx from "clsx";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axiosInstance from "@/lib/axios";

//component & files
import { formatPhoneNumber, formatPrice } from "@/utill/formatter";
import { useAuthStore } from "@/stores/useAuthStore";
import AdminDetail from "../AdminDetail";
import { matchgender } from "@/utill/dataformat";
import TargetDetail from "../TargetDetail";
import TitleCompo from "@/components/TitleCompo";

//style
import { StyledModal, UserManageStyled } from "./styled";
import { AntdGlobalTheme, GreenTheme } from "@/utill/antdtheme";

//antd
import type { SearchProps } from "antd/es/input";
import {
  Button,
  message,
  Select,
  Table,
  Input,
  notification,
  ConfigProvider,
} from "antd";
const { Search } = Input;

//전체 도우미 정보 컴포넌트
const UserManage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [userOrder, setUserOrder] = useState("ASC");
  const [sortKey, setSortKey] = useState("created_at");
  const [sortedUsers, setSortedUsers] = useState<any[]>([]);
  const [HelperId, setHelperId] = useState(); //클릭한 행의 도우미 아이디
  const [isHelperDetailModal, setIsHelperDetailModal] = useState(false); //도우미 상세 정보 모달 오픈 여부
  const [isTargetDetailModal, setIsTargetDetailModal] = useState(false); // 담당 피보호자 정보
  const [searchValue, setSearchValue] = useState(""); //search 검색 내용
  const [allUsers, setAllUsers] = useState<any[]>([]); //서치용 유저리스트
  const adminId = useAuthStore((state) => state.user?.id);

  //useEffect
  useEffect(() => {
    getUserList();
  }, []);

  // 유저정렬
  useEffect(() => {
    sortUsers();
  }, [userOrder, sortKey, users]);

  //도우미 정보 가지고 오기 요청
  const getUserList = async () => {
    try {
      //상태가 승인 완료인 모든 도우미 유저 모든 정보 불러오기
      const res = await axiosInstance.get("/helper/approveduser");
      const data = res.data;
      //console.log(data);

      const mapped = data.map((item: any, index: number) => ({
        key: item.user.id,
        number: index + 1,
        id: item.user.id,
        name: item.user.name,
        gender: matchgender(item.gender),
        desiredPay: formatPrice(item.desiredPay),
        phone: formatPhoneNumber(item.user.phone),
        origin: item,
      }));

      setUsers(mapped);
      setAllUsers(mapped);
    } catch (err) {
      console.error("유저 불러오기 실패", err);
    }
  };

  const handleHelperCancel = () => {
    setIsHelperDetailModal(false);
  };

  const hadleTargetCancel = () => {
    setIsTargetDetailModal(false);
  };

  //유저 정렬하기
  const sortUsers = () => {
    let sorted = [...users];

    if (sortKey === "created_at") {
      sorted.sort((a, b) =>
        userOrder === "DESC"
          ? b.origin.id - a.origin.id
          : a.origin.id - b.origin.id
      );
    }

    //console.log("sord", sorted);
    setSortedUsers(sorted);
  };

  // 엑셀 다운
  const handleDownloadExcel = () => {
    //console.log("users", users);
    //console.log("selectedRowKeys", selectedRowKeys);

    //선택한 도우미만 출력하기
    const filteredUsers = users.filter((user) =>
      selectedRowKeys.includes(user.origin.user.id)
    );

    if (filteredUsers.length === 0) {
      notification.error({
        message: "엑셀 다운로드",
        description: "선택한 도우미가 없습니다.",
      });

      return;
    }

    const excelData = filteredUsers.map((user) => ({
      이름: user.origin.user.name,
      생년월일: user.origin.birth,
      전화번호: user.phone,
      이메일: user.origin.user.email,
      성별: user.gender,
      일급: user.desiredPay,
      자격증1: user.origin.certificateName,
      자격증2: user.origin.certificateName2,
      자격증3: user.origin.certificateName3,
      경력: user.origin.experience,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "도우미 목록");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "도우미목록.xlsx");
    setSelectedRowKeys([]);
  };

  // 회원삭제(userId들 보냄)
  const WithdrawUser = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("삭제할 회원을 선택해주세요.");
      return;
    }
    try {
      await axiosInstance.delete("/helper/userdelete", {
        data: { ids: selectedRowKeys },
      });
      notification.success({
        message: `선택한 회원 삭제 성공`,
        description: `선택한 회원을 완전히 삭제했습니다.`,
      });
      getUserList(); // 목록 다시 불러오기
      setSelectedRowKeys([]); // 선택 초기화
    } catch (e) {
      //console.error("회원 삭제 실패:", e);
      notification.error({
        message: `선택한 회원 삭제 실패`,
        description: `선택한 회원 삭제에 실패했습니다.`,
      });
    }
  };

  // 테이블 rowSelection 설정
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      setSelectedRowKeys(keys);
    },
  };

  const columns = [
    {
      key: "number",
      title: "번호",
      dataIndex: "number",
    },
    {
      key: "name",
      title: "이름",
      dataIndex: "name",
    },
    {
      key: "phone",
      title: "전화번호",
      dataIndex: "phone",
    },
    {
      key: "gender",
      title: "성별",
      dataIndex: "gender",
    },
    {
      key: "desiredPay",
      title: "일급",
      dataIndex: "desiredPay",
    },
    {
      key: "detail",
      title: "도우미 상세 정보",
      dataIndex: "detail",
      render: (_: any, record: any) => {
        return (
          <ConfigProvider theme={AntdGlobalTheme}>
            <Button
              onClick={() => {
                //console.log("record", record);
                setIsHelperDetailModal(true);
                setHelperId(record.origin.user.id);
              }}
            >
              상세보기
            </Button>
          </ConfigProvider>
        );
      },
    },

    {
      key: "detail",
      title: "담당 피보호자 정보",
      dataIndex: "detail",
      render: (_: any, record: any) => {
        return (
          <ConfigProvider theme={AntdGlobalTheme}>
            <Button
              onClick={() => {
                setIsTargetDetailModal(true);
                setHelperId(record.origin.user.id);
              }}
            >
              상세보기
            </Button>
          </ConfigProvider>
        );
      },
    },
  ];

  //정렬 옵션
  const sortOption = [
    { value: "DESC", label: "최신순" },
    { value: "ASC", label: "오래된순" },
  ];

  //검색 함수
  const onSearch: SearchProps["onSearch"] = async (value) => {
    const filteredUsers = allUsers.filter((user) => user.name.includes(value));
    setUsers(filteredUsers);
    setSearchValue("");
  };

  return (
    <ConfigProvider theme={GreenTheme}>
      <UserManageStyled className={clsx("usermanage_wrap")}>
        <TitleCompo title="도우미 관리" />
        <div className="usermanage_info">
          <div className="usermanage_left">
            <div className="usermanage_total_num">총 {allUsers.length}명</div>
            <Select
              className="usermanage_order"
              value={userOrder}
              options={sortOption}
              onChange={(e) => {
                setUserOrder(e);
                setSortKey("created_at"); // 최신순/오래된순 정렬 기준을 가입일로 변경
              }}
            />
          </div>
          <div className="usermanage_right">
            <Search
              placeholder="이름을 입력해 주세요"
              allowClear
              onSearch={onSearch}
              style={{ width: 220 }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button onClick={handleDownloadExcel}>엑셀 다운로드</Button>
            <Button className="usermanage_delete_button" onClick={WithdrawUser}>
              회원삭제
            </Button>
          </div>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={sortedUsers}
          rowKey="key"
        />

        <StyledModal
          title=""
          closable={{ "aria-label": "Custom Close Button" }}
          open={isHelperDetailModal}
          onCancel={handleHelperCancel}
          footer={null}
          width={1000}
        >
          {HelperId && <AdminDetail id={HelperId} state="상세보기" />}
        </StyledModal>
        <StyledModal
          title=""
          closable={{ "aria-label": "Custom Close Button" }}
          open={isTargetDetailModal}
          onCancel={hadleTargetCancel}
          footer={null}
          width={1000}
        >
          {HelperId && <TargetDetail id={HelperId!} />}
        </StyledModal>
      </UserManageStyled>
    </ConfigProvider>
  );
};

export default UserManage;
