import { Modal } from "antd";
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
      margin-bottom: 10px;
      margin-top: 13px;

      .usermanage_left {
        display: flex;
        align-items: center;
      }
      .usermanage_right {
        display: flex;
        gap: 5px;
      }
      .usermanage_order {
        width: 140px;
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

  .ant-table-cell {
    text-align: center;
  }
`;

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding: 0px 10px 20px 20px;

    .ActivityList_Modal {
      max-height: 70vh;
      min-height: 300px;
      overflow-y: auto;
      margin-top: 0px;
      padding-right: 10px;
    }
  }
`;
