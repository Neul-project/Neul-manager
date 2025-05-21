import axiosInstance from "@/lib/axios";
import { AdminDetailtStyled } from "./styled";
import { useEffect, useState } from "react";
import TitleCompo from "@/components/TitleCompo";
import { dummy } from "./dummy"; //더미데이터 추후 삭제할 것
import clsx from "clsx";
import { Button, Modal, notification } from "antd";
import StateModal from "../StateModal";
//어드민 상세 페이지
const AdminDetail = (props: { id: string }) => {
  //변수 선언
  const { id } = props;

  //useState
  const [info, setInfo] = useState(); //현재 dummy사용 백엔드 받고 info로 변경 //어드민id에 해당하는 유저 정보
  const [isCanCleModalOpen, setIsCanCleModalOpen] = useState(false); //취소 모달
  const [isYesModalOpen, setIsYesModalOpen] = useState(false); //수락 모달

  //취소모달 yes 선택
  const handleCancleOk = () => {
    setIsCanCleModalOpen(false);
  };

  //취소모달 no 선택
  const handleCancleModle = () => {
    setIsCanCleModalOpen(false);
    setIsYesModalOpen(false);
  };

  const admindatalist = async () => {
    //id에 해당하는 도우미 전체 데이터 가져오기 요청
    //console.log("id", id);
    const res = await axiosInstance.get(`/user/admin/userlist`, {
      params: { id: id },
    });
    const data = res.data;
    setInfo(data);
  };

  useEffect(() => {
    //admindatalist();
  }, []);

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
    //백엔드 삭제 요청 - 도우미 등록 반려 요쳥
    axiosInstance.post("/user/admin/return", { id: id }).then((res) => {
      notification.success({
        message: `도우미 등록 반려`,
        description: "도우미 취소 요청을 성공하였습니다.",
      });
      setIsCanCleModalOpen(false);
    });
  };

  const YesAdmin = () => {
    //백엔드 등록 요청 - 정식 도우미 등록(승인 완료 상태로 변환)
    axiosInstance.post("/user/admin/registration", { id: id }).then((res) => {
      notification.success({
        message: `도우미 등록`,
        description: "성공적으로 도우미를 등록하였습니다.",
      });
      setIsYesModalOpen(false);
    });
  };

  return (
    <AdminDetailtStyled className={clsx("AdminDetail_main_wrap")}>
      <TitleCompo title={`이름 상세정보`} />
      <div className="AdminDetail_main_info">
        <div className="AdminDetail_info">
          <div className="AdminDetail_content">
            <div>이름 아무개</div>
            <div>생년월일 {dummy.birth}</div>
            <div>만 22세 / {dummy.gender}</div>
          </div>
          <div>{dummy.profileImage}</div>
        </div>
        <div>이하 내용</div>
      </div>
      <div className="AdminDetail_btns">
        <Button className="AdminDetail_btn" onClick={AdminCancle}>
          취소
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
          <StateModal type={"취소"} />
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
    </AdminDetailtStyled>
  );
};
export default AdminDetail;
