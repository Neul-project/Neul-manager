import { Modal } from "antd";
import styled from "styled-components";

export const ProgramlistStyled = styled.div`
  &.Programlist_main_wrap {
    display: flex;
    flex-direction: column;
    gap: 13px;

    .Programlist_btns {
      display: flex;
      width: 100%;
      justify-content: end;
      gap: 5px;

      .Programlist_search {
        width: 250px;
      }
    }

    .ant-pagination-item {
      border-color: none !important;
      color: #5da487 !important;
    }

    .ant-pagination-item-active {
      border-color: #5da487 !important;
      //box-shadow: 0 0 0 0px #5da487 !important;
      color: #5da487 !important;
    }

    .ant-pagination-item-active a {
      border-color: #5da487 !important;
      //box-shadow: 0 0 0 0px #5da487 !important;
      color: #5da487 !important;
    }

    .ant-select-item-option-selected {
      background-color: #5da487 !important;
      color: #fff !important;
    }

    .ant-table-thead > tr > th {
      text-align: center;
    }

    .ant-table-cell {
      text-align: center;
    }
  }
`;

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding: 0px 10px 20px 20px;
  }
  /* .ant-modal-close-x {
    margin-top: 10px;
    margin-left: -50px;
  } */

  .ProgramWrite_Modal {
    max-height: 70vh;
    min-height: 300px;
    overflow-y: auto;
    margin-top: 24px;
    padding-right: 10px;
  }
`;
