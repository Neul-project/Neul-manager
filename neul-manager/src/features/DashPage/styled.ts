import styled from "styled-components";

export const DashStyled = styled.div`
  &.DashPage_main_wrap {
    width: 100%;

    .DashPage_top {
      display: flex;
      align-items: flex-end;
      margin-top: 10px;
      margin-bottom: 10px;
      //justify-content: space-between;
      justify-content: end;
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
      gap: 85px;
      justify-content: center;

      //justify-content: space-around;

      .DashPage_gender_div {
        width: 25%;
        align-items: center;
        //padding: 10px;

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
        width: 60%;
        //padding-right: 10px;
      }
    }

    .DashPage_program_and_count {
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 85px;
      justify-content: center;

      .DashPage_gender_div {
        width: 25%;
        align-items: center;
        visibility: hidden;
        //padding: 10px;

        .DashPage_content_gender {
          display: flex;
          width: 100%;
          height: 100%;
          margin-top: 15px;
          //justify-content: space-between;
          //gap: 10px;
        }
      }
      .DashPage_program_div {
        width: 60%;
        padding-right: 10px;

        .DashPage_program_content {
          display: flex;
          width: 100%;
          height: 350px;
          margin-top: 30px;
        }
      }

      .DashPage_program_count_div {
        width: 50%;
        padding-left: 10px;

        .DashPage_program_count {
          display: flex;
          width: 100%;
          height: 350px;
          //height: 100%;
          margin-top: 30px;
        }
      }
    }
  }
`;
