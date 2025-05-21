import TitleCompo from "@/components/TitleCompo";
import { ApplicationMemberStyled, EllipsisText } from "./styled";

import { useEffect, useState } from "react";
import { AdminType, DataType, data } from "./tableinfo";
import { AntdGlobalTheme } from "@/utill/antdtheme";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/router";

//antd
import { Button, ConfigProvider, Table, Modal } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import AdminDetail from "../AdminDetail";
import { matchgender } from "@/utill/dataformat";
import { StyledModal } from "../Programlist/styled";
import { formatPrice } from "@/utill/formatter";

//행 선택 함수
const rowSelection: TableProps<DataType>["rowSelection"] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    // console.log(
    //   `selectedRowKeys: ${selectedRowKeys}`,
    //   "selectedRows: ",
    //   selectedRows
    // );
  },
};

//도우미 등록 페이지
const ApplicationMember = () => {
  //변수 선언
  const router = useRouter();

  //useState
  const [selectionType, setSelectionType] = useState<"checkbox">("checkbox"); //테이블 체크박스
  const [dataSorce, setDataSorce] = useState<DataType[]>(); //도우미 승인 대기 유저 리스트
  const [admincontent, setAdminContent] = useState(); //선택한 어드민 정보
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); //상세 모달
  const [helperId, setHelperId] = useState();
  const [helperName, setHelperName] = useState(""); //도우미 이름
  //테이블 열
  const columns: TableColumnsType<DataType> = [
    {
      title: "이름",
      dataIndex: "name",
    },
    {
      title: "성별",
      dataIndex: "gender",
    },
    {
      title: "일당",
      dataIndex: "desiredPay",
    },
    {
      title: "경력",
      dataIndex: "experience",
      render: (text: string) => (
        <EllipsisText title={text}>{text}</EllipsisText>
      ),
    },
    {
      title: "상세 정보",
      dataIndex: "detail",
      render: (_: any, record: any) => {
        return (
          <>
            <ConfigProvider theme={AntdGlobalTheme}>
              <Button
                onClick={() => {
                  //클릭 시 상세 내용 나옴
                  /*
                1.선택된 도우미 정보를 변수에 넣기
                2.페이지 이동 후 상세 내역 확인
                3.등록하기 
                */
                  //console.log("record", record);
                  setIsDetailModalOpen(true); //상세보기 모달 열기
                  setHelperName(record.name);
                  setHelperId(record.origin.user.id);
                  //setAdminContent(record.origin);
                  //router.push(`/users/appli/detail/${record.origin.id}`);
                }}
              >
                상세보기
              </Button>
            </ConfigProvider>
            <StyledModal
              title="" //**추후 이름 변경
              closable={{ "aria-label": "Custom Close Button" }}
              open={isDetailModalOpen}
              onCancel={handleCancel}
              footer={null}
              width={1000}
            >
              <AdminDetail
                id={helperId!}
                setIsDetailModalOpen={setIsDetailModalOpen}
              />
            </StyledModal>
          </>
        );
      },
    },
  ];

  //상세 모달 취소 버튼
  const handleCancel = () => {
    setIsDetailModalOpen(false);
  };

  //테이블 행에 맞춘 필터링 함수
  const FilterTableAdmin = async () => {
    //도우미 승인 대기 유저만 가져오기 요청 - 행 전체
    const res = await axiosInstance.get("/helper/applylist");
    //console.log("res", res.data);
    const adminlist = res.data;
    const mapped = adminlist.map((item: any, index: number) => ({
      key: index,
      name: item.user.name,
      gender: matchgender(item.gender),
      desiredPay: formatPrice(item.desiredPay),
      experience: item.experience,
      origin: item,
    }));
    setDataSorce(mapped);
  };

  useEffect(() => {
    FilterTableAdmin();
  }, []);

  useEffect(() => {
    FilterTableAdmin();
  }, [dataSorce]);

  return (
    <ApplicationMemberStyled>
      <TitleCompo title="도우미 등록" />
      <div className="ApplicationMember_main_table">
        <Table<DataType>
          rowSelection={{ type: selectionType, ...rowSelection }}
          columns={columns}
          dataSource={dataSorce}
        />
      </div>
    </ApplicationMemberStyled>
  );
};

export default ApplicationMember;
