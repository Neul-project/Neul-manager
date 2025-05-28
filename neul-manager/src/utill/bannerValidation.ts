import * as Yup from "yup";

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

export const bannerValidationSchema = Yup.object({
  leftimg: Yup.mixed()
    .required("좌측 이미지를 업로드 해주세요")
    .test("fileType", "이미지 파일만 업로드 가능합니다", (value) => {
      if (!value || !(value instanceof File)) return false;
      return SUPPORTED_FORMATS.includes((value as File).type);
    })
    .test("fileSize", "파일 크기는 5MB 이하만 가능합니다", (value) => {
      if (!value || !(value instanceof File)) return false;
      return (value as File).size <= FILE_SIZE_LIMIT;
    }),

  rightimg: Yup.mixed()
    .required("우측 이미지를 업로드 해주세요")
    .test("fileType", "이미지 파일만 업로드 가능합니다", (value) => {
      if (!value || !(value instanceof File)) return false;
      return SUPPORTED_FORMATS.includes((value as File).type);
    })
    .test("fileSize", "파일 크기는 5MB 이하만 가능합니다", (value) => {
      if (!value || !(value instanceof File)) return false;
      return (value as File).size <= FILE_SIZE_LIMIT;
    }),

  lefturl: Yup.string()
    .url("유효한 URL을 입력하세요")
    .required("좌측 URL은 필수입니다"),
  righturl: Yup.string()
    .url("유효한 URL을 입력하세요")
    .required("우측 URL은 필수입니다"),
});
