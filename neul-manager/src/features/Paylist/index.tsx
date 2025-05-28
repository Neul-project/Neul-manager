import { Payliststyled } from "./styled";
import { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import axiosInstance from "@/lib/axios";
import dayjs from "dayjs";
import TitleCompo from "@/components/TitleCompo";

interface PaymentItem {
  id: number;
  userName: string;
  adminName: string;
  price: number;
  create_at: string;
  orderId: string;
}

const Paylist = () => {
  const [data, setData] = useState<PaymentItem[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  //console.log("결제 리스트 응답", data);

  // 테이블 헤더
  const columns: ColumnsType<PaymentItem> = [
    {
      title: "번호",
      dataIndex: "key",
      key: "key",
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "주문번호",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "피보호자",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "도우미",
      dataIndex: "adminName",
      key: "adminName",
    },
    {
      title: "결제금액",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()}원`,
    },
    {
      title: "결제일",
      dataIndex: "create_at",
      key: "create_at",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
  ];

  // 결제리스트 요청
  useEffect(() => {
    const fetchPaymentList = async () => {
      try {
        const res = await axiosInstance.get<PaymentItem[]>(
          "/program/payment-list",
          { params: { type: "user" } }
        );
        //console.log("Da", res.data);

        const resdata = res.data;
        const filterdata = resdata.filter(
          (item: any) => item.paymentKey !== null
        );

        setData(filterdata);
      } catch (error) {
        console.error("결제 리스트 불러오기 실패:", error);
      }
    };

    fetchPaymentList();
  }, []);

  return (
    <Payliststyled>
      <TitleCompo title="결제 목록" />
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data.length,
          onChange: (page, pageSize) =>
            setPagination({ current: page, pageSize }),
        }}
      />
    </Payliststyled>
  );
};

export default Paylist;
