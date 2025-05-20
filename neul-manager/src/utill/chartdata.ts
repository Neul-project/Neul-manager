//성별
export const getGenderChartData = (male: number, female: number) => {
  return {
    labels: ["남자", "여자"],
    datasets: [
      {
        label: "성비",
        data: [male, female],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverOffset: 4,
      },
    ],
  };
};

//나이
export const getAgeChartData = (ageCounts: number[]) => {
  return {
    labels: ["10대", "20대", "30대", "40대", "50대", "60대", "70대 이상"],
    datasets: [
      {
        label: "연령별 피보호자 수",
        data: ageCounts,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
};

export const countByAgeGroup = (data: any[]): number[] => {
  const now = new Date();
  const ageGroups = [0, 0, 0, 0, 0, 0, 0]; // 10대 ~ 70대 이상

  data.forEach((item) => {
    const birthDate = new Date(item.birth);
    const age = now.getFullYear() - birthDate.getFullYear();

    if (age < 10) return; // 10세 미만은 제외 (필요 시 조정)

    const index =
      age < 20
        ? 0
        : age < 30
        ? 1
        : age < 40
        ? 2
        : age < 50
        ? 3
        : age < 60
        ? 4
        : age < 70
        ? 5
        : 6;

    ageGroups[index]++;
  });

  return ageGroups;
};

//나이 옵션
export const ageChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    // title: {
    //   display: true,
    //   text: "피보호자 연령 분포",
    // },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 5, // 세로 간격
        precision: 0, // 소수점 없게
      },
    },
  },
};

// utils/chartdata.ts 안에 추가해도 좋음
export const countProgramsByMonth = (programs: any[]) => {
  const counts: { [key: string]: number } = {};

  programs.forEach((program) => {
    const date = new Date(program.registration_at);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`; // "2025-05"
    counts[month] = (counts[month] || 0) + 1;
  });

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const recent5Months: string[] = [];
  for (let i = 4; i >= 0; i--) {
    let year = currentYear;
    let month = currentMonth - i;
    if (month <= 0) {
      year -= 1;
      month += 12;
    }
    recent5Months.push(`${year}-${String(month).padStart(2, "0")}`);
  }

  // 정렬된 라벨과 데이터
  const labels = recent5Months;
  //const labels = Object.keys(counts).sort(); // 예: ["2025-05", "2025-06", ...]
  const data = labels.map((label) => counts[label]);

  return { labels, data };
};

export const getProgramMonthlyChartData = (
  labels: string[],
  data: number[]
) => ({
  labels,
  datasets: [
    {
      label: "프로그램 등록 수",
      data,
      backgroundColor: "rgba(108, 166, 205, 0.7)",
      borderRadius: 8,
    },
  ],
});

//프로그램 건수 별 선형 그래프
export const countPaymentsByProgram = (payments: any[]) => {
  const counts: { [key: number]: { name: string; count: number } } = {};

  payments.forEach((payment) => {
    const id = payment.programId;
    const name = payment.programName;

    if (!counts[id]) {
      counts[id] = { name, count: 1 };
    } else {
      counts[id].count += 1;
    }
  });

  const sorted = Object.entries(counts)
    .sort((a, b) => b[1].count - a[1].count) // 결제 건수 내림차순
    .map(([id, value]) => ({ id: Number(id), ...value }))
    .slice(0, 7);

  const labels = sorted.map((item) => item.name); // programName 기준
  const data = sorted.map((item) => item.count);

  return { labels, data };
};

export const getPaymentLineChartData = (labels: string[], data: any) => ({
  labels,
  datasets: [
    {
      label: "프로그램별 결제 건수",
      data,
      borderColor: "#6ca6cd",
      backgroundColor: "rgba(108, 166, 205, 0.4)",
      tension: 0.3,
      fill: true,
    },
  ],
});
