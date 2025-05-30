import { useRouter } from "next/router";
import { ProgramlistStyled, StyledModal, StyledProgramModal } from "./styled";
import clsx from "clsx";
import {
  Button,
  Table,
  TableProps,
  Modal,
  ConfigProvider,
  notification,
  Input,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import ProgramWrite from "../ProgramWrite";
import { AntdGlobalTheme } from "@/utill/antdtheme";
import { formatPrice } from "@/utill/programcategory";
import { SearchProps } from "antd/es/input";
import { excelDownload, ExcelItem } from "@/utill/excelDownload";
import TitleCompo from "@/components/TitleCompo";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

interface DataType {
  key: number;
  title: string;
  manager: string;
  price: number;
  origin: any;
}

//프로그램 리스트 컴포넌트
const Programlist = () => {
  const router = useRouter();
  const [list, setList] = useState<DataType[]>();
  const [title, setTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [originlist, setOriginList] = useState([]);
  const [id, setId] = useState();
  const [searchValue, setSearchValue] = useState(""); //검색 내용

  const { Search } = Input;

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "번호",
      dataIndex: "num",
      key: "num",
    },
    {
      title: "프로그램명",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "담당자",
      dataIndex: "manager",
      key: "manager",
    },
    {
      title: "참여대상",
      dataIndex: "target",
      key: "target",
    },
    {
      title: "가격",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "상세",
      dataIndex: "detail",
      render: (_: any, record: any) => {
        return (
          <ConfigProvider theme={AntdGlobalTheme}>
            <Button
              onClick={() => {
                //console.log("re", record.origin);
                setTitle(record.title);
                setOriginList(record.origin);
                setIsModalOpen(true);
                setId(record.id);
              }}
            >
              상세
            </Button>
          </ConfigProvider>
        );
      },
    },
  ];

  //프로그램명 검색
  const onSearch: SearchProps["onSearch"] = useCallback(
    (value: any, _e: any) => {
      //console.log("value", value);

      //프로그램명 키워드 검색으로 내용 전체 반환 요청
      axiosInstance
        .get("/program/list", { params: { search: value } })
        .then((res) => {
          //console.log("res", res.data);
          const data = res.data.reverse();

          const programList = data.map((item: any, index: number) => ({
            num: index + 1,
            key: item.id,
            title: item.name,
            manager: item.manager,
            target: item.target,
            price: formatPrice(item.price),
            origin: item,
          }));

          setList(programList);
          setSearchValue("");
        });
    },
    []
  );

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    //console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  //등록하기 버튼 클릭
  const ProgramPost = () => {
    router.push("/program/manage/write");
  };

  //삭제하기 버튼 클릭
  const ProgramDelete = () => {
    //console.log("select", selectedRowKeys);

    if (selectedRowKeys.length < 1) {
      notification.info({
        message: "삭제할 프로그램을 선택해 주세요",
      });
    } else {
      setIsDeleteModalOpen(true);
    }
  };

  const FooterDelete = () => {
    axiosInstance.delete("/program/delete", {
      data: { ids: selectedRowKeys },
    });

    setList((prev) =>
      prev?.filter((item) => !selectedRowKeys.includes(item.key))
    );
    notification.success({
      message: "삭제되었습니다.",
    });
    setIsDeleteModalOpen(false);
    onSearch("");
  };

  //엑셀로 다운받기 클릭
  const execelDownload = () => {
    const excelData: ExcelItem[] =
      list?.map((item) => ({
        name: item.origin.name,
        category: item.origin.category,
        progress: item.origin.progress,
        recruitment: item.origin.recruitment,
        price: item.price,
        manager: item.origin.manager,
        call: item.origin.call,
        registration: item.origin.registration_at,
      })) ?? [];

    excelDownload(excelData);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    onSearch("");
  }, [onSearch]);

  return (
    <ConfigProvider theme={AntdGlobalTheme}>
      <ProgramlistStyled className={clsx("Programlist_main_wrap")}>
        <TitleCompo title="프로그램 등록" />
        <div className="Programlist_btns">
          <Search
            placeholder="프로그램명 검색"
            onSearch={onSearch}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="Programlist_search"
          />

          <Button onClick={ProgramPost}>등록하기</Button>

          <Button onClick={ProgramDelete}>삭제하기</Button>
          {isDeleteModalOpen && (
            <StyledProgramModal
              title="프로그램 삭제"
              open={isDeleteModalOpen}
              onCancel={() => setIsDeleteModalOpen(false)}
              footer={
                <Button key="back" onClick={FooterDelete}>
                  삭제하기
                </Button>
              }
              className="Delete_Modal"
            >
              <div>정말로 삭제하시겠습니까?</div>
            </StyledProgramModal>
          )}

          <Button onClick={execelDownload}>엑셀 다운로드</Button>
        </div>
        <div>
          <Table<DataType>
            rowSelection={rowSelection}
            columns={columns}
            dataSource={list}
          />
          {isModalOpen && (
            <StyledProgramModal
              title={`${title}`}
              key={isModalOpen ? id : "closed"}
              width={600}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <div className="ProgramWrite_Modal">
                <ProgramWrite
                  modify={"modify"}
                  list={originlist}
                  setIsModalOpen={setIsModalOpen}
                  getprogramlist={onSearch}
                />
              </div>
            </StyledProgramModal>
          )}
        </div>
      </ProgramlistStyled>
    </ConfigProvider>
  );
};

export default Programlist;
