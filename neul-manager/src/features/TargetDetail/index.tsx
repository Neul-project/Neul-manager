import axiosInstance from "@/lib/axios";
import { TargetDetailStyled } from "./styled";
import { useState } from "react";
import clsx from "clsx";
import TitleCompo from "@/components/TitleCompo";

import { Button, ConfigProvider, Modal, Table } from "antd";
import type { TableProps } from "antd";
import { DataType, data } from "./tableinfo";
import { AntdGlobalTheme } from "@/utill/antdtheme";

//담당 피보호자 정보 모달
const TargetDetail = (props: { id: number }) => {
  const { id } = props;
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [userlist, setUserList] = useState("");

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "생년월일",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "담당 기간",
      key: "days",
      dataIndex: "days",
    },
    {
      title: "보호자 전화번호",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "특이사항",
      key: "note",
      dataIndex: "note",
      render: (_: any, record: any) => {
        return (
          <>
            <ConfigProvider theme={AntdGlobalTheme}>
              <Button
                onClick={() => {
                  //클릭 시 상세 내용 나옴
                  setIsDetailModalOpen(true);
                }}
              >
                상세보기
              </Button>
            </ConfigProvider>
            <Modal
              title=""
              closable={{ "aria-label": "Custom Close Button" }}
              open={isDetailModalOpen}
              onCancel={handleCancel}
              footer={null}
              width={500}
            >
              <div>특이사항</div>
              <div>dfshkfdh</div>
            </Modal>
          </>
        );
      },
    },
  ];

  const handleCancel = () => {
    setIsDetailModalOpen(false);
  };

  console.log("id", id);
  //**백엔드에서 요청하기
  // axiosInstance
  //   .get("/activity/targetlist", { params: { adminId: id } })
  //   .then((res: any) => {
  //     //console.log("Res", res.data);
  //     setUserList(res.data);
  //   });

  return (
    <TargetDetailStyled className={clsx("TargetDetail_main_wrap")}>
      <TitleCompo title={`담당 피보호자 상세정보`} />
      <div className="TargetDetail_table">
        <Table<DataType> columns={columns} dataSource={data} />
      </div>
    </TargetDetailStyled>
  );
};

export default TargetDetail;
