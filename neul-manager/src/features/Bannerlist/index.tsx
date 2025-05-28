import TitleCompo from "@/components/TitleCompo";
import clsx from "clsx";
import { useRouter } from "next/router";
import { AntdGlobalTheme, GreenTheme } from "@/utill/antdtheme";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";

//style
import { BannerlistStyled } from "./styled";
import { Button, ConfigProvider, Table, TableProps } from "antd";
import { StyledModal } from "../Programlist/styled";
import Banner from "../Banner";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

//tabel interface
interface DataType {
  key: number;
  num: number;
  img: string;
  url: string;
}

//배너 관리 컴포넌트
const Bannerlist = () => {
  //변수선언
  const router = useRouter();
  const [arr, setArr] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); //모달 클릭 여부
  const [arrid, setArrId] = useState(); //클릭한 아이디
  //생성하기 버튼 클릭
  const SubmitBanner = () => {
    router.push("/banner/write");
  };

  //삭제하기 버튼 클릭
  const deleteBanner = () => {
    //console.log("selectedRowKeys", selectedRowKeys);
    axiosInstance.delete("/banner/delete", { data: { ids: selectedRowKeys } });
  };

  //모달 닫기
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //등록하기 버튼
  const RegistrationBanner = () => {
    console.log("selectedRowKeys", selectedRowKeys[0]);

    //메인 등록용 요청 - id는 PK값이 들어감
    axiosInstance.post("/banner/mainpost", { id: selectedRowKeys[0] });
  };

  //화면 렌더링 시 해당 배너 리스트 가지고 옴
  useEffect(() => {
    axiosInstance.get("/banner/list").then((res: any) => {
      //console.log("Res", res.data);

      const data = res.data.map((item: any, index: number) => ({
        key: item.id,
        id: item.id,
        num: index + 1,
        img: item.img,
        url: item.url,
      }));

      setArr(data);
    });
  }, []);

  const columns = [
    {
      title: "번호",
      dataIndex: "num",
      key: "num",
    },
    {
      title: "이미지",
      dataIndex: "img",
      key: "img",
      ellipsis: true,
    },
    {
      title: "이미지URL",
      dataIndex: "url",
      key: "url",
      ellipsis: true,
    },
    {
      title: "상세",
      dataIndex: "detail",
      key: "detail",
      render: (_: any, record: any) => {
        return (
          <ConfigProvider theme={AntdGlobalTheme}>
            <Button
              onClick={() => {
                //console.log("re", record.origin);
                setIsModalOpen(true);
                setArrId(record.id);
              }}
            >
              상세
            </Button>
          </ConfigProvider>
        );
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <BannerlistStyled className={clsx("Bannerlist_main_wrap")}>
      <TitleCompo title={"광고 관리"} />
      <div className="Bannerlist_btns">
        <ConfigProvider theme={GreenTheme}>
          <Button onClick={RegistrationBanner}>광고 등록하기</Button>
          <Button onClick={SubmitBanner}>생성하기</Button>
          <Button onClick={deleteBanner}>삭제하기</Button>
        </ConfigProvider>
      </div>
      {/* 하단 테이블 */}
      <Table rowSelection={rowSelection} dataSource={arr} columns={columns} />
      <StyledModal
        width={600}
        title={""}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="ActivityList_Modal">
          <Banner route={"detail"} arrid={arrid} />
        </div>
      </StyledModal>
    </BannerlistStyled>
  );
};

export default Bannerlist;
