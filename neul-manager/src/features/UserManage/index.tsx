import { useEffect, useState } from "react";
import clsx from "clsx";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axiosInstance from "@/lib/axios";

//component & files
import { formatPhoneNumber, formatPrice } from "@/utill/formatter";
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
  Select,
  Table,
  Input,
  notification,
  ConfigProvider,
  Modal,
} from "antd";
import { searchOption, sortOption } from "./info";
const { Search } = Input;

//전체 도우미 정보 컴포넌트
const UserManage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [userOrder, setUserOrder] = useState("DESC"); // 내림차순/오름차순 정렬
  const [sortKey, setSortKey] = useState("created_at");
  const [sortedUsers, setSortedUsers] = useState<any[]>([]);
  const [HelperId, setHelperId] = useState(); //클릭한 행의 도우미 아이디
  const [isHelperDetailModal, setIsHelperDetailModal] = useState(false); //도우미 상세 정보 모달 오픈 여부
  const [isTargetDetailModal, setIsTargetDetailModal] = useState(false); // 담당 피보호자 정보
  const [allUsers, setAllUsers] = useState<any[]>([]); //서치용 유저리스트
  const [selectSearch, setSelectSearch] = useState<string>("id");
  const [isDeleteModal, setIsDeleteModal] = useState(false); //삭제하기 모달

  //useEffect
  useEffect(() => {
    getUserList();
  }, []);

  // 유저정렬
  useEffect(() => {
    sortUsers();
  }, [userOrder, sortKey, users]);

  //도우미 정보 가지고 오기 요청
  const getUserList = async (value?: any, selectSearch?: any) => {
    //console.log(value, selectSearch);
    try {
      //상태가 승인 완료인 모든 도우미 유저 모든 정보 불러오기
      //search : 검색 내용, search_value : 검색 종류(id : 도우미 유저 아이디, name :도우미 유저 이름)
      const res = await axiosInstance.get("/helper/info", {
        params: { type: "approve", search: value, search_value: selectSearch },
      });
      const data = res.data.reverse();
      //console.log(data);

      const mapped = data.map((item: any, index: number) => ({
        key: item.user.id,
        number: index + 1,
        id: item.user.id,
        helper_id: item.user.email,
        name: `${item.user.name}(${item.user.id})`,
        gender: matchgender(item.gender),
        desiredPay: formatPrice(item.desiredPay),
        phone: formatPhoneNumber(item.user.phone),
        origin: item,
      }));

      setUsers(mapped);
      setAllUsers(mapped);
    } catch (err) {
      //console.error("유저 불러오기 실패", err);
    }
  };

  const handleHelperCancel = () => {
    setIsHelperDetailModal(false);
    setIsDeleteModal(false);
    setIsTargetDetailModal(false);
  };

  //유저 정렬하기
  const sortUsers = () => {
    let sorted = [...users];
    //console.log("sortd", sorted);
    if (sortKey === "created_at") {
      sorted.sort((a, b) =>
        userOrder === "DESC" ? b.key - a.key : a.key - b.key
      );
    }

    //console.log("sord", sorted);
    setSortedUsers(sorted);
  };

  // 엑셀 다운
  const handleDownloadExcel = () => {
    const excelData = users.map((user) => ({
      name: user.origin.user.name,
      birth: user.origin.birth,
      phone: user.phone,
      email: user.origin.user.email,
      gender: user.gender,
      desiredPay: user.desiredPay,
      certificate1: user.origin.certificateName,
      certificate2: user.origin.certificateName2,
      certificate3: user.origin.certificateName3,
      experience: user.origin.experience,
    }));

    const header = [
      "이름",
      "생년월일",
      "전화번호",
      "이메일",
      "성별",
      "일당",
      "자격증1",
      "자격증2",
      "자격증3",
      "경력",
    ];

    const worksheet = XLSX.utils.json_to_sheet(excelData, {
      header: [
        "name",
        "birth",
        "phone",
        "email",
        "gender",
        "desiredPay",
        "certificate1",
        "certificate2",
        "certificate3",
        "experience",
      ],
    });

    // 헤더 이름 한글로 설정
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: "A1" });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "도우미 목록");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "도우미목록.xlsx");
  };

  const columns = [
    {
      key: "number",
      title: "번호",
      dataIndex: "number",
    },
    {
      key: "name",
      title: "이름(ID)",
      dataIndex: "name",
    },
    {
      key: "helper_id",
      title: "이메일",
      dataIndex: "helper_id",
    },
    {
      key: "gender",
      title: "성별",
      dataIndex: "gender",
    },
    {
      key: "desiredPay",
      title: "일당",
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
    {
      key: "delete",
      title: "관리",
      dataIndex: "delete",
      render: (_: any, record: any) => {
        return (
          <ConfigProvider theme={AntdGlobalTheme}>
            <Button
              onClick={() => {
                //console.log("re", record.id);
                setIsDeleteModal(true);
                setHelperId(record.origin.user.id);
              }}
            >
              삭제하기
            </Button>
          </ConfigProvider>
        );
      },
    },
  ];

  //삭제하기 버튼 클릭
  const deleteMember = async () => {
    //삭제하기 요청
    //console.log("HelperId", HelperId);

    const res = await axiosInstance.delete("/user/withdraw", {
      data: { userId: HelperId },
    });
    //console.log("re", res);
    if (res.data.ok) {
      //매칭이 되어 있지 않은 경우
      notification.success({
        message: `도우미 삭제 성공`,
        description: `도우미를 완전히 삭제했습니다.`,
      });
    } else {
      //매칭되어 있는 경우
      notification.error({
        message: `도우미 삭제 실패`,
        description: `매칭된 사용자가 있어 도우미를 삭제할 수 없습니다.`,
      });
    }
    setIsDeleteModal(false); //삭제 모달 닫기
    getUserList(); // 목록 다시 불러오기
  };

  const handleChange = (value: string) => {
    // 선택된 검색 셀렉트
    setSelectSearch(value);
  };

  //검색 함수
  const onSearch: SearchProps["onSearch"] = async (value) => {
    //console.log("검색 기준", selectSearch);
    //console.log("검색 단어", value);
    getUserList(value, selectSearch);
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
            <Select
              className="usermanage_order"
              style={{ width: 100 }}
              value={selectSearch}
              options={searchOption}
              onChange={handleChange}
            />
            <Search
              placeholder="검색할 내용을 입력해주세요."
              allowClear
              onSearch={onSearch}
              style={{ width: 250 }}
            />
            <Button onClick={handleDownloadExcel}>엑셀 다운로드</Button>
          </div>
        </div>
        <Table columns={columns} dataSource={sortedUsers} rowKey="key" />

        {/* 도우미 상세 정보 모달 */}
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

        {/* 담당 피보호자 정보 모달*/}
        <StyledModal
          title=""
          closable={{ "aria-label": "Custom Close Button" }}
          open={isTargetDetailModal}
          onCancel={handleHelperCancel}
          footer={null}
          width={1000}
        >
          {HelperId && <TargetDetail id={HelperId!} />}
        </StyledModal>

        {/* 삭제하기 모달 */}
        <Modal
          title="도우미 삭제"
          closable={{ "aria-label": "Custom Close Button" }}
          open={isDeleteModal}
          onCancel={handleHelperCancel}
          footer={
            <>
              <Button onClick={handleHelperCancel}>취소하기</Button>
              <Button type="primary" onClick={deleteMember}>
                삭제하기
              </Button>
            </>
          }
          width={600}
        >
          <div>정말로 해당 도우미를 삭제하시겠습니까?</div>
        </Modal>
      </UserManageStyled>
    </ConfigProvider>
  );
};

export default UserManage;
