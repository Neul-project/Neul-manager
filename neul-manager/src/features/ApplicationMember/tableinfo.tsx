import { AntdGlobalTheme } from "@/utill/antdtheme";
import { Button, ConfigProvider, TableColumnsType } from "antd";

//테이블 타입
export interface DataType {
  key: number;
  name: string; //이름
  gender: string; //성별
  desiredPay: number; //일당
  experience: string; //경력
}

export interface AdminType {
  id: number; //해당 userid
  desiredPay: number; //일당
  experience: string; //경력 사항
  birth: string; //생년월일
  gender: string; //성별
  certificateName: string; //자격증 이름
  certificateName2: string; //자격증 이름2
  certificateName3: string; //자격증 이름3
  profileImage: string; //이미지 파일
  certificate: string; //자격증 합본 파일
  status: string; //승인 상태
  origin?: any;
}

//더미 데이터
export const data: DataType[] = [
  {
    key: 1,
    name: "이림",
    gender: "여성",
    desiredPay: 12000,
    experience: "00대학교 졸업생",
  },
];
