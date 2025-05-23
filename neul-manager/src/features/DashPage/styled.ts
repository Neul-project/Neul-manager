import styled from "styled-components";

export const DashStyled = styled.div`
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

  .DashPage_content_gender {
    display: flex;
    width: 100%;
    height: 350px;
    margin-top: 15px;
    justify-content: space-between;
    //gap: 10px;

    .DashPage_gender {
      width: 100%;
      height: 100%;
      text-align: center;
    }

    .DashPage_title {
      font-size: 17px;
      font-weight: bolder;
      margin-bottom: 10px;
      text-align: center;
    }
  }

  .DashPage_content_age {
    width: 100%;

    .DashPage_age {
      width: 100%;
      height: 100%;
      text-align: center;
    }
  }

  .DashPage_2section {
    display: flex;
    width: 100%;

    .DashPage_program_content {
      display: flex;
      width: 50%;
      margin-top: 30px;

      .DashPage_program {
        width: 100%;
        height: 100%;

        .DashPage_title {
          font-size: 17px;
          font-weight: bolder;
          margin-bottom: 10px;
        }
      }
    }
  }

  .DashPage_content {
    display: flex;
    width: 100%;
    margin-top: 30px;
    justify-content: space-between;

    .DashPage_title {
      font-size: 17px;
      font-weight: bolder;
      margin-bottom: 10px;
    }
  }
`;
