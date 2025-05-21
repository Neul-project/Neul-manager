import styled from "styled-components";

export const UserManageStyled = styled.div`
  &.usermanage_wrap {
    .usermanage_title_box {
      display: flex;
      justify-content: end;
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
      margin-bottom: 5px;

      .usermanage_sort_box {
        display: flex;
        align-items: center;
        .usermanage_order {
          width: 140px;
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

    .ant-table-cell {
      text-align: center;
    }
  }
`;
