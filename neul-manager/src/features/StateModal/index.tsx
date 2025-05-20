import { StateModaltStyled } from "./styled";

const StateModal = (props: { type: string }) => {
  const { type } = props;
  return (
    <StateModaltStyled>
      {type === "취소" ? (
        <>정말로 해당 유저를 도우미 등록을 취소하시겠습니까?</>
      ) : (
        <>정말로 해당 유저를 도우미 등록 하시겠습니까?</>
      )}
    </StateModaltStyled>
  );
};

export default StateModal;
