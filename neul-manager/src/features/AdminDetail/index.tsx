import axiosInstance from "@/lib/axios";
import { AdminDetailtStyled } from "./styled";
import { useEffect, useState } from "react";
import TitleCompo from "@/components/TitleCompo";
import clsx from "clsx";
import { Button, Divider, Modal, notification } from "antd";
import StateModal from "../StateModal";
import { matchgender } from "@/utill/dataformat";
import {
  formatPhoneNumber,
  formatPrice,
  getKoreanAge,
} from "@/utill/formatter";

//어드민 상세 페이지
const AdminDetail = (props: {
  id: number;
  state?: string;
  setIsDetailModalOpen?: any;
}) => {
  //변수 선언
  const { id, state, setIsDetailModalOpen } = props;

  //useState
  const [info, setInfo] = useState<AdminUser | undefined>(); //어드민id에 해당하는 유저 정보
  const [isCanCleModalOpen, setIsCanCleModalOpen] = useState(false); //취소 모달
  const [isYesModalOpen, setIsYesModalOpen] = useState(false); //수락 모달
  const [resontext, setResonText] = useState(""); // 취소 모달 반려 이유

  //취소모달 yes 선택
  const handleCancleOk = () => {
    setIsCanCleModalOpen(false);
  };

  //취소모달 no 선택
  const handleCancleModle = () => {
    setIsCanCleModalOpen(false);
    setIsYesModalOpen(false);
    setResonText("");
  };

  const admindatalist = async () => {
    //id에 해당하는 도우미 전체 데이터 가져오기 요청
    console.log("id", id);
    const res = await axiosInstance.get(`/helper/userlist`, {
      params: { id: id },
    });
    const data = res.data;
    //console.log("data", data);

    setInfo(data);
  };

  useEffect(() => {
    admindatalist();
  }, [id]);

  //취소 버튼 클릭
  const AdminCancle = () => {
    setIsCanCleModalOpen(true);
  };

  //수락 버튼 클릭
  const AdminYes = () => {
    setIsYesModalOpen(true);
  };

  //등록 취소
  const DeleteAdmin = () => {
    //console.log("text", resontext);

    //백엔드 삭제 요청 - 도우미 등록 반려 요쳥
    axiosInstance
      .post("/helper/return", { id: id, content: resontext })
      .then((res) => {
        notification.success({
          message: `도우미 등록 반려`,
          description: "도우미 취소 요청을 성공하였습니다.",
        });
        setIsCanCleModalOpen(false);
        setIsDetailModalOpen(false);
        setResonText("");
      });
  };

  const YesAdmin = () => {
    //백엔드 등록 요청 - 정식 도우미 등록(승인 완료 상태로 변환)
    axiosInstance.post("/helper/registration", { userId: id }).then((res) => {
      notification.success({
        message: `도우미 등록`,
        description: "성공적으로 도우미를 등록하였습니다.",
      });
      setIsYesModalOpen(false);
      setIsDetailModalOpen(false);
    });
  };

  //첨부파일 다운로드 클릭 함수
  const filedownload = async () => {
    //console.log("info", info);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/uploads/file/" + info?.certificate,
        {
          method: "GET",
        }
      );
      //console.log("response", response);

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = info?.certificate; // 다운로드 시 파일명
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error("다운로드 실패", err);
    }
  };

  return (
    <AdminDetailtStyled className={clsx("AdminDetail_main_wrap")}>
      <TitleCompo title={`이름 상세정보`} />
      <div className="AdminDetail_main_info">
        <div className="AdminDetail_info">
          <div className="AdminDetail_content">
            <div className="AdminDetail_text">
              <div className="AdminDetail_title">이름</div>
              <div className="AdminDetail_sub_title">
                {info?.user.name}
                <div className="AdminDetail_small_font">
                  ({matchgender(info?.gender)})
                </div>
              </div>
            </div>
            <div className="AdminDetail_text">
              <div className="AdminDetail_title">생년월일</div>
              <div className="AdminDetail_sub_title">
                {info?.birth}
                <div className="AdminDetail_small_font">
                  (만{getKoreanAge(info?.birth!)}세)
                </div>
              </div>
            </div>
            <div className="AdminDetail_text">
              <div className="AdminDetail_title">전화번호</div>
              {formatPhoneNumber(info?.user.phone!)}
            </div>
            <div className="AdminDetail_text">
              <div className="AdminDetail_title">E-mail</div>
              {info?.user.email}
            </div>
          </div>
          <div className="AdminDetail_Profileimg">
            <img
              className="AdminDetail_imgstyle"
              src={
                process.env.NEXT_PUBLIC_API_URL +
                "/uploads/image/" +
                info?.profileImage
              }
              alt="profilimg"
            />
          </div>
        </div>
        <div className="AdminDetail_subContent">
          <div className="AdminDetail_text">
            <div className="AdminDetail_title">자격증</div>
            {info?.certificateName}
          </div>
          <div className="AdminDetail_text">
            <div className="AdminDetail_title"></div>
            {info?.certificateName2}
          </div>
          <div className="AdminDetail_text">
            <div className="AdminDetail_title"></div> {info?.certificateName3}
          </div>

          <div className="AdminDetail_text">
            <div className="AdminDetail_title">일급</div>
            {formatPrice(info?.desiredPay!)}
          </div>
          <div className="AdminDetail_text">
            <div className="AdminDetail_title">경력</div>
            <div className="AdminDetail_experience">{info?.experience}</div>
          </div>
        </div>
        <div className="AdminDetail_download">
          <Button onClick={filedownload}>첨부파일 다운로드</Button>
        </div>
      </div>

      {state !== "상세보기" ? (
        <div className="AdminDetail_btns">
          <Button className="AdminDetail_btn" onClick={AdminCancle}>
            반려
          </Button>
          <Modal
            title="취소 모달"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isCanCleModalOpen}
            onOk={handleCancleOk}
            onCancel={handleCancleModle}
            footer={
              <>
                <Button onClick={handleCancleModle}>아니요</Button>
                <Button onClick={DeleteAdmin}>예</Button>
              </>
            }
          >
            <StateModal type={"취소"} setResonText={setResonText} />
          </Modal>
          <Button className="AdminDetail_btn" onClick={AdminYes}>
            수락
          </Button>
          <Modal
            title="수락 모달"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isYesModalOpen}
            onOk={handleCancleOk}
            onCancel={handleCancleModle}
            footer={
              <>
                <Button onClick={handleCancleModle}>아니요</Button>
                <Button onClick={YesAdmin}>예</Button>
              </>
            }
          >
            <StateModal type={"수락"} />
          </Modal>
        </div>
      ) : (
        <div></div>
      )}
    </AdminDetailtStyled>
  );
};
export default AdminDetail;
