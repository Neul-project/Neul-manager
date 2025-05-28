import styled from "styled-components";

export const UserManageStyled = styled.div`
  &.usermanage_wrap {
    //페이지네이션 가운데 맞춤
    .ant-table-wrapper .ant-table-pagination-right {
      justify-content: center;
    }

    .usermanage_title_box {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .usermanage_search_select {
      width: 130px;
    }
    .usermanage_info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      margin-top: 15px;

      .usermanage_right {
        display: flex;
        gap: 5px;
      }
      .usermanage_sort_box {
        display: flex;
        align-items: center;

        .usermanage_order {
          width: 95px;
        }

        .usermanage_total_num {
          font-weight: 600;
          margin-right: 10px;
        }
      }
    }

    tr:hover {
      cursor: pointer;
    }

    .ant-table-thead > tr > th {
      text-align: center;
    }

    .ant-table-cell {
      text-align: center;
    }
  }
`;
