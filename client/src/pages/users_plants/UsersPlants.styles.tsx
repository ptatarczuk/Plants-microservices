import styled from "styled-components";
import { COLOR_1, COLOR_2, COLOR_3, COLOR_4 } from "../../constants/constants";

export const PlantCardsMainContainerStyle = styled.div`
  // background-color: ${COLOR_2};
  // min-width: 500px;
  width: calc(100vw - 420px);
  height: 90vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: 90vh;
  position: absolute;
  top: 30px;
  left: 360px;
  overflow-y: auto;
  margin-right: 30px;

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

export const PlantCardsContainer = styled.div`
  // margin-top: 32px;
  // margin-bottom: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
`;

export const InfoContainer = styled.div`
  // margin-top: 24px;
  // margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30vh;
`;
