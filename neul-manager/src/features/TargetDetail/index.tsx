import axiosInstance from "@/lib/axios";
import { TargetDetailStyled } from "./styled";
import { useState } from "react";
import clsx from "clsx";
import TitleCompo from "@/components/TitleCompo";

import { Table } from "antd";
import type { TableProps } from "antd";
import { DataType, columns, data } from "./tableinfo";

//담당 피보호자 정보 모달
const TargetDetail = (props: { id: number }) => {
  const { id } = props;

  //변수
  const [userlist, setUserList] = useState("");
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
