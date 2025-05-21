// 휴대전화번호(01011111111) -> 010-1111-1111 포맷
export const formatPhoneNumber = (phone: string): string => {
  if (!phone || phone.length !== 11) return phone;
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

//#,##0원 표기
export function formatPrice(value: number) {
  if (typeof value !== "number" || isNaN(value)) return "";
  return value.toLocaleString() + "원";
}

//만나이 구하기
export function getKoreanAge(birthDateString: string): number {
  const today = new Date();
  const birthDate = new Date(birthDateString);

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasBirthdayPassedThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassedThisYear) {
    age--;
  }

  return age;
}
