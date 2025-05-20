import styled from "styled-components";

export const AdminDetailtStyled = styled.div`
  &.AdminDetail_main_wrap {
    width: 100%;
    height: 100%;

    .AdminDetail_main_info {
      margin-top: 15px;
      width: 100%;

      .AdminDetail_info {
        display: flex;
        justify-content: space-between;

        .AdminDetail_content {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      }
    }

    .AdminDetail_btns {
      display: flex;
      width: 100%;
      gap: 50px;
      justify-content: space-around;
      .AdminDetail_btn {
        width: 50%;
      }
    }
  }
`;
