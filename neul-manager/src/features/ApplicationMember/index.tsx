import TitleCompo from "@/components/TitleCompo";
import { ApplicationMemberStyled } from "./styled";
import { Button, ConfigProvider, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useEffect, useState } from "react";
import { AdminType, DataType, data } from "./tableinfo";
import { AntdGlobalTheme } from "@/utill/antdtheme";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/router";

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
  const [dataSorce, setDataSorce] = useState<AdminType>(); //도우미 승인 대기 유저 리스트
  const [admincontent, setAdminContent] = useState(); //선택한 어드민 정보

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
    },
    {
      title: "상세",
      dataIndex: "detail",
      render: (_: any, record: any) => {
        return (
          <ConfigProvider theme={AntdGlobalTheme}>
            <Button
              onClick={() => {
                //클릭 시 상세 내용 나옴
                /*
                1.선택된 도우미 정보를 변수에 넣기
                2.페이지 이동 후 상세 내역 확인
                3.등록하기 
                */
                console.log("record", record);
                //setAdminContent(record.origin);
                router.push(`/users/appli/detail/1`); //**추후 삭제
                //router.push(`/users/appli/detail/${record.origin.id}`);
              }}
            >
              상세
            </Button>
          </ConfigProvider>
        );
      },
    },
  ];

  //테이블 행에 맞춘 필터링 함수
  const FilterTableAdmin = async () => {
    //도우미 승인 대기 유저만 가져오기 요청 - 행 전체
    const res = await axiosInstance.get("/user/admin/applylist");
    const adminlist = res.data;
    const mapped = adminlist.map((item: any, index: number) => ({
      key: index,
      name: item.name,
      gender: item.gender,
      desiredPay: item.desiredPay,
      experience: item.experience,
      origin: item,
    }));
    setDataSorce(mapped);
  };

  useEffect(() => {
    //FilterTableAdmin();
  }, []);

  return (
    <ApplicationMemberStyled>
      <TitleCompo title="도우미 등록" />
      <div className="ApplicationMember_main_table">
        <Table<DataType>
          rowSelection={{ type: selectionType, ...rowSelection }}
          columns={columns}
          dataSource={data} // 이후 dataSorce로 변경
        />
      </div>
    </ApplicationMemberStyled>
  );
};

export default ApplicationMember;
