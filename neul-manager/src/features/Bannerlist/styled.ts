import styled from "styled-components";

export const BannerlistStyled = styled.div`
  //페이지네이션 가운데 맞춤
  .ant-table-wrapper .ant-table-pagination-right {
    justify-content: center;
  }

  &.Bannerlist_main_wrap {
    display: flex;
    flex-direction: column;
    gap: 5px;

    .Bannerlist_btns {
      display: flex;
      width: 100%;
      justify-content: end;
      gap: 5px;
    }

    .ant-table-thead > tr > th {
      text-align: center;
    }

    .ant-table-cell {
      text-align: center;
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
  }
`;
