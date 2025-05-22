import styled from "styled-components";

export const LoginStyled = styled.div`
  &.Login_main_wrap {
    max-width: 1280px;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    margin: 0px auto;
    margin-top: 130px;
    gap: 15px;

    .Login_logo {
      width: 100px;
      height: 100px;
      display: flex;
      margin: 0px auto;

      .Login_imgstyle {
        width: 100%;
        height: 100%;
      }
    }
    .Login_title {
      font-size: 20px;
      margin-top: -30px;
      margin-bottom: 10px;
    }

    .Login_form {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 10px;
      text-align: center;

      .Login_input {
        width: 300px;
        height: 50px;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #ccc;
        margin: 0px auto;

        &:focus {
          border: 1px solid #5da487;
          outline: none;
        }
      }
    }
    .Login_btn {
      width: 200px;
      height: 42px;
      margin-top: 20px;
      border: none;
      border-radius: 8px;
      background-color: #5da487;
      color: #fff;
      font-weight: 700;
      font-size: 16px;
      cursor: pointer;
    }
  }
`;
