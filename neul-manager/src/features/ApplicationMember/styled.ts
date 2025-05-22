import styled from "styled-components";

export const ApplicationMemberStyled = styled.div`
  .ApplicationMember_main_table {
    margin-top: 10px;

    .ant-table-cell {
      text-align: center;
    }

    .ant-pagination-item {
      border-color: #5da487 !important;
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
  }
`;

export const EllipsisText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
`;
