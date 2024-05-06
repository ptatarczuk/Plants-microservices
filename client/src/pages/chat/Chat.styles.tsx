import styled from "styled-components";
import { COLOR_1, COLOR_2, COLOR_BLACK } from "../../constants/constants";

export const ChatMainContainerStyle = styled.div`
  //   background-color: ${COLOR_2};
  height: 90vh;
  min-height: 500px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  position: absolute;
  top: 30px;
  left: 390px;
  overflow-y: auto;
  margin-right: 30px;
  width: calc(100vw - 420px);
  min-width: 600px;
`;

export const ChatContainer = styled.div`
  height: 100%;
  //   width: 100%;
  // background-color: grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
`;

export const ChatInfoDetails = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  background-color: ${COLOR_1};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const ChatChannel = styled.div`
  text-decoration: none;
  color: ${COLOR_BLACK};
  width: 100%;

  &:hover {
    cursor: pointer;
    color: grey;
  }
`;
