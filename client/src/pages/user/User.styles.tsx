import styled from "styled-components";
import { COLOR_1, COLOR_2, COLOR_3, COLOR_5 } from "../../constants/constants";

export const UserMainContainerStyle = styled.div`
  // background-color: ${COLOR_2};
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 90vh;
  position: absolute;
  top: 30px;
  left: 390px;
  overflow-y: auto;
  margin-right: 30px;
  width: calc(100vw - 420px);
  min-width: 600px;

  /* WebKit (Chrome, Safari) scrollbar */
  &::-webkit-scrollbar {
    width: 12px; /* Width of the scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(153, 160, 152, 0.4); /* Color of the thumb */
    border-radius: 6px; /* Radius of the thumb */
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.2); /* Color of the track */
    border-radius: 6px; /* Radius of the track */
    opacity: 50%;
  }
`;
export const UserInfoContainer = styled.div`
  height: 100%;
  //   background-color: ${COLOR_3};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
`;

export const UserInfoDetails = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLOR_1};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
