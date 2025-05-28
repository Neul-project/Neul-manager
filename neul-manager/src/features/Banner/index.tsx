import clsx from "clsx";
import { BannerStyled } from "./styled";
import { useFormik } from "formik";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import { AntdGlobalTheme } from "@/utill/antdtheme";

// antd
import { Button, Input, Upload, notification, ConfigProvider } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadProps } from "antd";
import { bannerValidationSchema } from "@/utill/bannerValidation";

interface arrTpye {
  id: number;
  img: string;
  url: string;
}

//배너 등록 컴포넌트
const Banner = () => {
  const formik = useFormik({
    initialValues: {
      img: null as File | null,
      url: "",
    },
    validationSchema: bannerValidationSchema,
    onSubmit: async (values) => {
      //console.log("values", values);
      const formData = new FormData();
      if (values.img) formData.append("img", values.img);
      formData.append("url", values.url);

      try {
        await axiosInstance.post("/banner/registration", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        notification.success({
          message: "등록 완료",
          description: "광고가 정상적으로 등록되었습니다.",
        });
      } catch (error) {
        notification.error({
          message: "에러",
          description: "업로드 중 문제가 발생했습니다.",
        });
      }
    },
  });

  const handleUpload = (side: "img"): UploadProps => ({
    beforeUpload: (file) => {
      formik.setFieldValue(side, file);
      return false;
    },
    maxCount: 1,
  });

  return (
    <ConfigProvider theme={AntdGlobalTheme}>
      <form onSubmit={formik.handleSubmit}>
        <BannerStyled className={clsx("Banner_main_wrap")}>
          {/* 저장 버튼 */}
          <div className="Banner_save">
            <Button htmlType="submit" className="Banner_save_btn">
              저장하기
            </Button>
          </div>

          {/* 미리보기 */}
          <div className="Banner_imgs">
            <div className="Banner_left_img">
              {formik.values.img ? (
                <img
                  className="Banner_imgstyle"
                  src={URL.createObjectURL(formik.values.img)}
                  alt="banner-left"
                />
              ) : (
                <div className="Banner_preview_text">미리보기 화면</div>
              )}
            </div>
          </div>

          {/* 업로드 버튼 */}
          <div className="Banner_btns">
            <div className="Banner_btn">
              <Upload {...handleUpload("img")} showUploadList={false}>
                <Button icon={<UploadOutlined />}>이미지 업로드</Button>
              </Upload>
              {formik.touched.img && formik.errors.img && (
                <div className="Banner_error">{formik.errors.img}</div>
              )}
            </div>
          </div>

          <div className="Banner_inputs">
            <div className="Banner_input">
              <Input
                name="url"
                placeholder="링크를 입력하시오"
                className="Banner_title"
                value={formik.values.url}
                onChange={formik.handleChange}
              />
              {formik.touched.url && formik.errors.url && (
                <div style={{ color: "red", marginTop: 4 }}>
                  {formik.errors.url}
                </div>
              )}
            </div>
          </div>
        </BannerStyled>
      </form>
    </ConfigProvider>
  );
};

export default Banner;
