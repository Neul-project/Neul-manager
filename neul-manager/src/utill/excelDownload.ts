import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export interface ExcelItem {
  name: string;
  category: string;
  progress: string;
  recruitment: string;
  price: number | string;
  manager: string;
  call: string;
  registration: string;
}

export const excelDownload = (list: ExcelItem[]) => {
  const excelData = list ?? [];

  const worksheet = XLSX.utils.json_to_sheet(excelData, {
    header: [
      "name",
      "category",
      "progress",
      "recruitment",
      "price",
      "manager",
      "call",
      "registration",
    ],
  });

  // 컬럼 한글 제목 추가
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [
      [
        "프로그램명",
        "카테고리",
        "진행기간",
        "모집기간",
        "수강료",
        "담당자명",
        "문의전화",
        "등록일자",
      ],
    ],
    { origin: "A1" }
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "프로그램목록");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });
  saveAs(file, "프로그램목록.xlsx");
};
