import { TableProps } from "antd";

export interface DataType {
  key: number;
  name: string;
  age: string;
  gender: string;
  days: string;
  phone: string;
  note: string;
}

export const columns: TableProps<DataType>["columns"] = [
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
  },
];

export const data: DataType[] = [
  {
    key: 1,
    name: "김바나",
    age: "2001-12-30",
    gender: "여성",
    days: "2025-05-15",
    phone: "01012341234",
    note: "없음",
  },
];
