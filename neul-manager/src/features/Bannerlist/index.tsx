import TitleCompo from "@/components/TitleCompo";
import clsx from "clsx";
import { useRouter } from "next/router";
import { AntdGlobalTheme, GreenTheme } from "@/utill/antdtheme";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";

//style
import { BannerlistStyled } from "./styled";
import {
  Button,
  ConfigProvider,
  Table,
  TableProps,
  Modal,
  notification,
} from "antd";
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
  const [isModalOpen, setIsModalOpen] = useState(false); //상세 모달 클릭 여부
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); //삭제하기 모달

  const [arrid, setArrId] = useState(); //클릭한 아이디

  //생성하기 버튼 클릭
  const SubmitBanner = () => {
    router.push("/banner/write");
  };

  //삭제하기 버튼 클릭
  const deleteBanner = () => {
    if (selectedRowKeys.length < 1) {
      notification.error({
        message: "광고 삭제하기",
        description: "삭제할 행을 먼저 선택해주세요.",
      });
      return;
    }
    setDeleteModalOpen(true);
  };

  //모달에서 삭제하기 버튼 클릭
  const modalDelete = () => {
    //console.log("selectedRowKeys", selectedRowKeys);
    axiosInstance
      .delete("/banner/delete", { data: { ids: selectedRowKeys } })
      .then((res) => {
        notification.success({
          message: `광고 삭제하기`,
          description: "광고가 성공적으로 삭제되었습니다.",
        });
        setDeleteModalOpen(false);
        getBannerlist();
      });
  };

  //모달 닫기
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //배너 리스트 가져오기 요청
  const getBannerlist = () => {
    axiosInstance.get("/banner/list").then((res: any) => {
      //console.log("Res", res.data);
      const data = res.data.reverse().map((item: any, index: number) => ({
        key: item.id,
        id: item.id,
        num: index + 1,
        img: item.img,
        url: item.url,
      }));
      setArr(data);
    });
  };

  //화면 렌더링 시 해당 배너 리스트 가지고 옴
  useEffect(() => {
    getBannerlist();
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
      title: "URL",
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
    //console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  //모달 확인 버튼
  const handleOk = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  return (
    <BannerlistStyled className={clsx("Bannerlist_main_wrap")}>
      <TitleCompo title={"광고 관리"} />
      <div className="Bannerlist_btns">
        <ConfigProvider theme={GreenTheme}>
          <Button onClick={SubmitBanner}>생성하기</Button>
          <Button onClick={deleteBanner}>삭제하기</Button>
        </ConfigProvider>
      </div>
      {/* 하단 테이블 */}
      <Table rowSelection={rowSelection} dataSource={arr} columns={columns} />
      <StyledModal
        width={1000}
        title={"광고 이미지 미리보기"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="ActivityList_Modal">
          <Banner route={"detail"} arrid={arrid} />
        </div>
      </StyledModal>

      {/* 삭제하기 모달 */}
      <Modal
        title="광고 삭제하기"
        closable={{ "aria-label": "Custom Close Button" }}
        open={deleteModalOpen}
        onOk={handleOk}
        onCancel={handleDeleteCancel}
        footer={
          <ConfigProvider theme={GreenTheme}>
            <Button key="no">취소하기</Button>
            <Button key="yes" type="primary" onClick={modalDelete}>
              삭제하기
            </Button>
          </ConfigProvider>
        }
      >
        <div>정말로 삭제하실 건가요?</div>
      </Modal>
    </BannerlistStyled>
  );
};

export default Bannerlist;
