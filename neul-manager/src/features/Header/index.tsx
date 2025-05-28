import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { HeaderStyled } from "./styled";
import clsx from "clsx";
import { Button, ConfigProvider, MenuProps, Modal } from "antd";
import { useAuthStore } from "@/stores/useAuthStore";
import { GreenTheme } from "@/utill/antdtheme";

export interface HeaderProps {
  className?: string;
}

//해당하는 URL은 Header가 표시되지 않습니다.
export const nonePageObject = ["/login"];
const items: MenuProps["items"] = [
  {
    label: "로그아웃",
    key: "1",
  },
];

const Header = ({ className }: HeaderProps) => {
  // 라우터
  const router = useRouter();
  // 현재 경로
  const pathname = router?.pathname;

  const { user } = useAuthStore();
  //console.log("user", user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    useAuthStore.getState().logout();
    Cookies.remove("access_token");
    router.push("/login");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    showModal();
  };

  const handleMenuClick: MenuProps["onClick"] = (info) => {
    if (info.key === "1") {
      handleLogout();
    }
  };

  return (
    <HeaderStyled
      className={clsx(
        "Header",
        nonePageObject.some((x) => {
          if (x === "/") {
            return pathname === "/";
          }
          return pathname.includes(x);
        }) && "headerOff",
        className
      )}
    >
      <div className="navigation">
        <div className="left">
          <Link href="/">관리자 페이지</Link>
        </div>
        <div className="right">
          <span>{user?.name}님</span>
          <span className="header_userinfo" onClick={showModal}>
            로그아웃
          </span>
        </div>

        <Modal
          title="로그아웃"
          open={isModalOpen}
          closable={false}
          footer={[
            <ConfigProvider key="close" theme={GreenTheme}>
              <Button onClick={handleCancel}>취소</Button>
            </ConfigProvider>,
            <ConfigProvider key="complete" theme={GreenTheme}>
              <Button type="primary" onClick={handleOk}>
                로그아웃
              </Button>
            </ConfigProvider>,
          ]}
        >
          <div>정말로 로그아웃 하시겠습니까?</div>
        </Modal>
      </div>
    </HeaderStyled>
  );
};

export default Header;
