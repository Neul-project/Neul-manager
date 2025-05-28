import styled from "styled-components";

export const HeaderStyled = styled.div`
  &.headerOff {
    display: none;
  }
  color: white;
  background: #5da487;
  padding: 20px;
  height: 64px;
  /* border-bottom: 1px solid #333; */
  .navigation {
    font-size: 1.25rem;
    justify-content: space-between;
    align-items: center;
    display: flex;
    grid-gap: 0.75rem;
    .userDiv {
      grid-gap: 0.75rem;
      display: flex;
    }
  }

  .username {
    cursor: pointer;
  }

  .header_userinfo {
    cursor: pointer;
    margin-left: 12px;
  }
`;
