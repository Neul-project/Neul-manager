import styled from "styled-components";

export const ProgramWriteStyled = styled.div`
  &.ProgramWrite_main_wrap {
    display: flex;
    flex-direction: column;
    width: 100%;

    .ProgramWrite_submit_btn {
      width: 100%;
    }

    .ProgramWrite_form_content {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .ProgramWrite_row {
        display: flex;
        flex-direction: column;
        align-items: left;
        gap: 7px;

        .ProgramWrite_error_message {
          color: red;
          font-size: 12px;
        }
      }
    }
  }
`;
