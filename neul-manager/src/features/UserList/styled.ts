import styled from "styled-components";

export const UserManageStyled = styled.div`
  &.usermanage_wrap {
    padding: 20px;

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
      margin-right: 3px;
      width: 130px;
    }
    .usermanage_info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3px;

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
    .usermanage_delete_button {
      margin-right: 3px;
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
