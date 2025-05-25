import axiosInstance from "@/lib/axios";
import { TargetDetailStyled } from "./styled";
import { useEffect, useState } from "react";
import clsx from "clsx";
import TitleCompo from "@/components/TitleCompo";

import { Button, ConfigProvider, Modal, Table } from "antd";
import type { TableProps } from "antd";
import { DataType } from "./tableinfo";
import { AntdGlobalTheme } from "@/utill/antdtheme";
import { matchgender } from "@/utill/dataformat";

//담당 피보호자 정보 모달
const TargetDetail = (props: { id: number }) => {
  const { id } = props;
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [userlist, setUserList] = useState([]);
  const [note, setNote] = useState("");

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "생년월일",
      dataIndex: "birth",
      key: "birth",
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
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
                  //console.log("re", record);
                  setIsDetailModalOpen(true);
                  setNote(record.note);
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
              <div>{note}</div>
            </Modal>
          </>
        );
      },
    },
  ];

  const handleCancel = () => {
    setIsDetailModalOpen(false);
  };

  //console.log("id", id);
  //**백엔드에서 요청하기

  useEffect(() => {
    axiosInstance
      .get("/status/patient", { params: { adminId: id } })
      .then((res: any) => {
        //console.log("Res", res.data);
        const data = res.data;

        const mapped = data.map((item: any, index: number) => ({
          key: item.id,
          name: item.name,
          birth: item.birth,
          gender: matchgender(item.gender),
          note: item.note,
        }));

        setUserList(mapped);
      });
  }, [id]);
  return (
    <TargetDetailStyled className={clsx("TargetDetail_main_wrap")}>
      <TitleCompo title={`담당 피보호자 상세정보`} />
      <div className="TargetDetail_table">
        <Table<DataType> columns={columns} dataSource={userlist} />
      </div>
    </TargetDetailStyled>
  );
};

export default TargetDetail;
