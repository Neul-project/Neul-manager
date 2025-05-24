import styled from "styled-components";

export const DashStyled = styled.div`
  &.DashPage_main_wrap {
    width: 100%;

    .DashPage_top {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      .DashPage_today {
        font-size: 15px;
      }
    }

    .DashPage_main_title {
      font-size: 20px;
      font-weight: bolder;
      margin-top: 40px;
    }

    .DashPage_gender_age {
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      //gap: 20px;

      justify-content: space-between;

      .DashPage_gender_div {
        width: 30%;
        padding-left: 10px;

        .DashPage_content_gender {
          display: flex;
          width: 100%;
          height: 100%;
          margin-top: 15px;
          //justify-content: space-between;
          //gap: 10px;
        }
      }

      .DashPage_age_div {
        width: 70%;
        padding-right: 10px;
      }
    }

    .DashPage_program_and_count {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;

      .DashPage_program_div {
        width: 90%;

        .DashPage_program_content {
          display: flex;
          width: 100%;
          height: 100%;
          margin-top: 30px;
        }
      }

      .DashPage_program_count_div {
        width: 90%;

        .DashPage_program_count {
          display: flex;
          width: 100%;
          height: 100%;
          margin-top: 30px;
        }
      }
    }
  }
`;
