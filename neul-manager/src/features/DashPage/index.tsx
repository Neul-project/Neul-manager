import { DashStyled } from "./styled";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

import {
  getGenderChartData,
  getAgeChartData,
  ageChartOptions,
  countByAgeGroup,
  countProgramsByMonth,
  getProgramMonthlyChartData,
  countPaymentsByProgram,
  getPaymentLineChartData,
} from "@/utill/chartdata";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
} from "chart.js";
import clsx from "clsx";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Title
);

const DashBoard = () => {
  const [patientGenderData, setPatientGenderData] = useState<number[]>([]); // [남자 수, 여자 수]
  const [PatientAgeData, setPatientAgeData] = useState<number[]>([]);
  //월별 프로그램 건 수
  const [programMonthlyData, setProgramMonthlyData] = useState<{
    labels: string[];
    data: number[];
  }>({ labels: [], data: [] });

  //프로그램 결제 건 수
  const [programPaymentData, setProgramPaymentData] = useState<{
    labels: string[];
    data: number[];
  }>({ labels: [], data: [] });

  const [isLoading, setIsLoading] = useState(true);

  //오늘 날짜 표시하기
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  useEffect(() => {
    axiosInstance.get("/status/patient").then((res) => {
      //console.log("전체 admin당 피보호자 리스트", res.data);

      //성비 - 남성
      const male = res.data.filter(
        (item: any) => item.gender === "male"
      ).length;

      //성비 - 여성
      const female = res.data.filter(
        (item: any) => item.gender === "female"
      ).length;

      setPatientGenderData([male, female]);
      const ageCounts = countByAgeGroup(res.data);
      setPatientAgeData(ageCounts);
      setIsLoading(false);
    });

    axiosInstance.get("/program/list").then((res) => {
      //console.log("progran", res.data);
      const { labels, data } = countProgramsByMonth(res.data);
      setProgramMonthlyData({ labels, data });
    });

    axiosInstance.get("/program/payment-list").then((res) => {
      // console.log("res", res.data);
      const { labels, data } = countPaymentsByProgram(res.data);
      setProgramPaymentData({ labels, data });
    });
  }, []);

  //연령별 데이터
  const ageChartData = getAgeChartData(
    PatientAgeData.length > 0 ? PatientAgeData : [0, 0, 0, 0, 0, 0, 0]
  );

  //성별 데이터
  const genderdata = getGenderChartData(
    patientGenderData[0] || 0,
    patientGenderData[1] || 0
  );

  return (
    <DashStyled className={clsx("DashPage_main_wrap")}>
      <div className="DashPage_top">
        {/* <TitleCompo title="대시보드" /> */}
        <div className="DashPage_today">오늘 일자 : {formattedDate}</div>
      </div>

      <div className="DashPage_gender_age">
        {/* 피보호자 성비 */}
        <div className="DashPage_gender_div">
          <div className="DashPage_main_title">피보호자 성비</div>
          <Pie data={genderdata} />
        </div>

        {/* 피보호자 연령 */}
        <div className="DashPage_age_div">
          <div className="DashPage_main_title">피보호자 연령</div>
          <Bar data={ageChartData} options={ageChartOptions} />
        </div>
      </div>

      <div className="DashPage_program_and_count">
        {/* 월별 프로그램 등록 */}
        <div className="DashPage_program_div">
          <div className="DashPage_main_title">월별 프로그램 등록</div>
          <div className="DashPage_program_content">
            <Bar
              data={getProgramMonthlyChartData(
                programMonthlyData.labels,
                programMonthlyData.data
              )}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 10, // 세로 간격
                      precision: 0, // 소수점 없게
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* 프로그램 결제 건 수 */}
        <div className="DashPage_program_count_div">
          <div className="DashPage_main_title">프로그램 결제 건 수</div>
          <div className="DashPage_program_count">
            <Line
              data={getPaymentLineChartData(
                programPaymentData.labels,
                programPaymentData.data
              )}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  x: {
                    ticks: {
                      maxTicksLimit: 10, // 최대 라벨 조절
                    },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 10, // 세로 간격
                      precision: 0, // 소수점 없게
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </DashStyled>
  );
};
export default DashBoard;
