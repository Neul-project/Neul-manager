import { useEffect, useState } from "react";
import {
  Button,
  message,
  Modal,
  Select,
  Table,
  Input,
  notification,
  ConfigProvider,
} from "antd";
import clsx from "clsx";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import TitleCompo from "@/components/TitleCompo";
import axiosInstance from "@/lib/axios";
import { UserManageStyled } from "./styled";
import type { SearchProps } from "antd/es/input";
import { GreenTheme } from "@/utill/antdtheme";
import { formatPhoneNumber } from "@/utill/formatter";
import dayjs, { Dayjs } from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { StyledModal } from "../Programlist/styled";
dayjs.extend(isSameOrBefore);
const { Search } = Input;

//회원관리 > 사용자 관리 > 사용자 관리 탭
const UserList = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [userOrder, setUserOrder] = useState("DESC");
  const [sortKey, setSortKey] = useState("matcing_at");
  const [sortedUsers, setSortedUsers] = useState<any[]>([]);
  const [selectSearch, setSelectSearch] = useState<string>("user_id");

  const getUserList = async (value?: any) => {
    //console.log("d", value, selectSearch);
    try {
      const res = await axiosInstance.get("/matching/search", {
        params: {
          search: selectSearch, // 어떤 기준으로 검색하는지(user_id->보호자ID, user_name->보호자 이름, patient_name->피보호자 이름)
          word: value, // 검색 단어
        },
      });
      const searchData = res.data;
      //console.log("검색된 유저들", searchData);

      const mapped = searchData
        .filter((item: any) => item.patient !== null)
        .map((item: any) => ({
          key: item.user.id,
          id: item.user.id,
          email: item.user.email,
          name: item.user.name,
          phone: item.user.phone,
          patient_id: item.patient?.id,
          patient_name: item.patient?.name,
          patient_gender: item.patient?.gender === "male" ? "남" : "여",
          patient_birth: item.patient?.birth || "-",
          patient_note: item.patient?.note || "",
          matcing_at: item?.match.matching_at || "", // 매칭된 날짜
        }));

      setUsers(mapped);
    } catch (e) {
      //console.error("검색 실패: ", e);
      notification.error({
        message: `검색 실패`,
        description: `검색에 실패하였습니다.`,
      });
    }
  };

  useEffect(() => {
    getUserList("");
  }, []);

  // 유저 정렬하기
  const sortUsers = () => {
    let sorted = [...users];
    //console.log("sor", sorted);
    if (sortKey === "matcing_at") {
      sorted.sort((a, b) =>
        userOrder === "DESC"
          ? new Date(b.matcing_at).getTime() - new Date(a.matcing_at).getTime()
          : new Date(a.matcing_at).getTime() - new Date(b.matcing_at).getTime()
      );
    }
    setSortedUsers(sorted);
  };

  // 유저정렬
  useEffect(() => {
    sortUsers();
  }, [userOrder, sortKey, users]);

  // 엑셀 다운
  const handleDownloadExcel = () => {
    //console.log("users", users);
    const excelData = users.map((user) => ({
      guardianId: user.id,
      guardianEmail: user.email,
      guardianName: user.name,
      guardianPhone: user.phone,
      patientId: user.patient_id,
      patientName: user.patient_name,
      patientGender: user.patient_gender,
      patientBirth: user.patient_birth,
      patientNote: user.patient_note,
    }));

    // 영문 키 순서대로 지정 (엑셀 데이터 필드 순서 설정)
    const keys = [
      "guardianId",
      "guardianEmail",
      "guardianName",
      "guardianPhone",
      "patientId",
      "patientName",
      "patientGender",
      "patientBirth",
      "patientNote",
    ];

    // 실제 엑셀에 출력될 헤더 (한글)
    const header = [
      "보호자ID",
      "보호자_이메일",
      "보호자명",
      "보호자_전화번호",
      "피보호자ID",
      "피보호자명",
      "피보호자_성별",
      "피보호자_생년월일",
      "피보호자_특이사항",
    ];

    const worksheet = XLSX.utils.json_to_sheet(excelData, { header: keys });

    // A1부터 한글 헤더 삽입
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: "A1" });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "사용자목록");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "사용자목록.xlsx");
  };

  // 회원삭제(userId들 보냄)
  const WithdrawUser = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("삭제할 회원을 선택해주세요.");
      return;
    }
    try {
      //console.log("selectedRowKeys", selectedRowKeys);
      await axiosInstance.delete("/helper/userdelete", {
        data: { ids: selectedRowKeys },
      });
      notification.success({
        message: `선택한 회원 삭제 성공`,
        description: `선택한 회원을 완전히 삭제했습니다.`,
      });
      getUserList(""); // 목록 다시 불러오기
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
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      key: "email",
      title: "아이디",
      dataIndex: "email",
    },
    {
      key: "user",
      title: "보호자명 (ID)",
      render: (record: any) =>
        record.name
          ? `${record.name} (${record.id})`
          : `없음 (${record.id || "없음"})`,
    },
    {
      key: "phone",
      title: "전화번호",
      render: (record: any) => formatPhoneNumber(record.phone),
    },
    {
      key: "patient_name",
      title: "피보호자명(ID)",
      render: (record: any) =>
        record.patient_name
          ? `${record.patient_name}(${record.patient_id})`
          : `-`,
    },
    {
      key: "patient_gender",
      title: "피보호자 성별",
      dataIndex: "patient_gender",
    },
    {
      key: "patient_birth",
      title: "피보호자 생년월일",
      dataIndex: "patient_birth",
    },
  ];

  const sortOption = [
    { value: "DESC", label: "최신순" },
    { value: "ASC", label: "오래된순" },
  ];

  const searchOption = [
    { value: "user_id", label: "아이디" },
    { value: "user_name", label: "보호자명" },
    { value: "patient_name", label: "피보호자명" },
  ];

  const handleChange = (value: string) => {
    // 선택된 검색 셀렉트
    setSelectSearch(value);
  };

  const onSearch: SearchProps["onSearch"] = async (value) => {
    // console.log("검색 기준", selectSearch);
    // console.log("검색 단어", value);
    try {
      getUserList(value);
    } catch (e) {
      //console.error("검색 실패: ", e);
      notification.error({
        message: `검색 실패`,
        description: `검색에 실패하였습니다.`,
      });
    }
  };

  return (
    <ConfigProvider theme={GreenTheme}>
      <UserManageStyled className={clsx("usermanage_wrap")}>
        <div className="usermanage_title_box">
          <TitleCompo title="사용자 관리" />
          <div>
            <Button className="usermanage_delete_button" onClick={WithdrawUser}>
              회원삭제
            </Button>
            <Button onClick={handleDownloadExcel}>엑셀 다운로드</Button>
          </div>
        </div>

        <div className="usermanage_info">
          <div className="usermanage_sort_box">
            <div className="usermanage_total_num">총 {users.length}명</div>
            <Select
              className="usermanage_order"
              value={userOrder}
              options={sortOption}
              onChange={(e) => {
                setUserOrder(e);
                setSortKey("matcing_at"); // 최신순/오래된순 정렬 기준을 가입일로 변경
              }}
            />
          </div>
          <div>
            <Select
              className="usermanage_search_select"
              value={selectSearch}
              options={searchOption}
              onChange={handleChange}
            />
            <Search
              placeholder="선택한 기준으로 검색"
              allowClear
              onSearch={onSearch}
              style={{ width: 200 }}
            />
          </div>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={sortedUsers}
          rowKey="key"
          onRow={(record) => ({
            onClick: () => {
              setSelectedUser(record); // 클릭한 유저 데이터
              setModalOpen(true); // 모달 열기
            },
          })}
        />
        <StyledModal
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
          centered
        >
          <div className="Userlist_Modal">
            <h3>특이사항</h3>
            {selectedUser && (
              <div>
                <p>{selectedUser.patient_note}</p>
              </div>
            )}
          </div>
        </StyledModal>
      </UserManageStyled>
    </ConfigProvider>
  );
};

export default UserList;
