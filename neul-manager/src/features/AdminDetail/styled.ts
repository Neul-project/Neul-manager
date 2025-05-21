import styled from "styled-components";

export const AdminDetailtStyled = styled.div`
  &.AdminDetail_main_wrap {
    width: 100%;
    height: 100%;
    padding: 10px;

    .AdminDetail_main_info {
      margin-top: 30px;
      width: 100%;
      border-top: 1px solid #ccc;
      padding-top: 15px;

      .AdminDetail_info {
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 0px 40px;

        .AdminDetail_content {
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 55%;
          justify-content: center;

          .AdminDetail_text {
            font-size: 20px;
            display: flex;
            gap: 30px;

            .AdminDetail_title {
              width: 100px;
              //background-color: red;
            }
            .AdminDetail_sub_title {
              display: flex;
              align-items: center;
              gap: 5px;
            }
            .AdminDetail_small_font {
              font-size: 16px;
            }
          }
        }

        .AdminDetail_Profileimg {
          width: 200px;
          height: 250px;
          object-fit: contain;

          .AdminDetail_imgstyle {
            width: 100%;
            height: 100%;
          }
        }
      }

      .AdminDetail_subContent {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
        border-top: 1px solid #ccc;
        padding: 0px 40px;
        padding-top: 15px;

        .AdminDetail_text {
          font-size: 20px;
          display: flex;
          gap: 30px;

          .AdminDetail_title {
            width: 100px;
            //background-color: red;
          }
          .AdminDetail_sub_title {
            display: flex;
            align-items: center;
            gap: 5px;
          }
          .AdminDetail_small_font {
            font-size: 16px;
          }

          .AdminDetail_experience {
            width: 100%;
            max-height: 300px;
            padding: 0px 15px;
            overflow-y: auto;
            //background-color: red;
          }
        }
      }
      .AdminDetail_download {
        width: 100%;
        display: flex;
        justify-content: left;
        margin-top: 20px;
        margin-bottom: 10px;
        padding: 0px 40px;
      }
    }

    .AdminDetail_btns {
      display: flex;
      width: 100%;
      gap: 50px;
      padding: 0px 40px;
      justify-content: space-around;
      .AdminDetail_btn {
        width: 50%;
      }
    }
  }
`;
