import { useState } from "react";
import { StateModaltStyled } from "./styled";

//antd
import { Input } from "antd";
const { TextArea } = Input;

//반려 / 수락 모달
const StateModal = (props: {
  type: string;
  setResonText?: (value: string) => void;
}) => {
  //변수 선언
  const { type, setResonText } = props;

  return (
    <StateModaltStyled>
      {type === "취소" ? (
        <>
          <div>해당 유저의 도우미 등록을 정말로 취소하시겠습니까?</div>
          <div>사유를 입력해 주세요.</div>
          <TextArea
            rows={4}
            onChange={(e) => {
              setResonText?.(e.target.value);
            }}
          />
        </>
      ) : (
        <>해당 유저를 정말로 도우미로 등록하시겠습니까?</>
      )}
    </StateModaltStyled>
  );
};

export default StateModal;
