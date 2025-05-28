import styled from "styled-components";

export const BannerStyled = styled.div`
  &.Banner_main_wrap {
    .Banner_title {
      //font-size: 24px;
      //margin-bottom: 13px;
    }

    .Banner_imgs {
      display: flex;
      flex-direction: row;
      width: 100%;
      gap: 20px;

      .Banner_left_img {
        width: 100%;
        height: 350px;
        border: 1px solid #ccc;
        border-radius: 15px;
        overflow: hidden;

        .Banner_imgstyle {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .Banner_preview_text {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .Banner_btns {
      display: flex;
      justify-content: space-around;
      padding: 10px 0px;

      .Banner_error {
        color: red;
        margin-top: 4px;
        margin-left: -40px;
      }
    }

    .Banner_save {
      display: flex;
      width: 100%;
      justify-content: right;
      margin-bottom: 13px;
    }

    .Banner_inputs {
      display: flex;
      gap: 20px;

      .Banner_input {
        width: 100%;
      }
    }
  }
`;
