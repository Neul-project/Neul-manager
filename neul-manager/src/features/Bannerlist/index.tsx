import TitleCompo from "@/components/TitleCompo";
import clsx from "clsx";
import { useRouter } from "next/router";
import { GreenTheme } from "@/utill/antdtheme";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";

//style
import { BannerlistStyled } from "./styled";
import { Button, ConfigProvider, Table, TableProps } from "antd";

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

  //생성하기 버튼 클릭
  const SubmitBanner = () => {
    router.push("/banner/write");
  };

  //삭제하기 버튼 클릭
  const deleteBanner = () => {
    //console.log("selectedRowKeys", selectedRowKeys);
    axiosInstance.delete("/banner/delete", { data: { ids: selectedRowKeys } });
  };

  //등록하기 버튼
  const RegistrationBanner = () => {};

  //화면 렌더링 시 해당 배너 리스트 가지고 옴
  useEffect(() => {
    axiosInstance.get("/banner/list").then((res: any) => {
      console.log("Res", res.data);

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
    },
    {
      title: "이미지URL",
      dataIndex: "url",
      key: "url",
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
    </BannerlistStyled>
  );
};

export default Bannerlist;
