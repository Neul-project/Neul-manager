import * as Yup from "yup";

export const bannerValidationSchema = Yup.object({
  img: Yup.mixed()
    .required("이미지를 업로드 해주세요")
    .test("fileType", "이미지 파일만 업로드 가능합니다", (value) => {
      if (!value) return false;
      if (!(value instanceof File)) return false;
      return ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
        value.type
      );
    }),

  url: Yup.string().url("유효한 URL을 입력하세요").required("URL은 필수입니다"),
});
