import styled from "styled-components";
import { COLOR_1, COLOR_2, COLOR_3 } from "../../constants/constants";

export const PlantCatalogueMainContainerStyle = styled.div`
  // background-color: ${COLOR_2};
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 90vh;
  position: absolute;
  top: 30px;
  left: 390px;
  margin-right: 30px;
  width: calc(100vw - 420px);
  min-width: 600px;
`;

export const SearchBackgroundContainer = styled.div`
  width: 100%;
  min-height: 90px;
  background-color: ${COLOR_3};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 10px;
`;

export const SearchPlantsContainer = styled.div`
  background-color: ${COLOR_1};
  border-radius: 10px;
  border: none;
  width: 360px;
  margin-left: 60px;
`;

export const SearchResultsContainer = styled.div`
  // margin-top: 24px;
  // margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  min-height: 70vh;
  // background-color: yellow;
  overflow-y: auto;

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

export const InfoContainer = styled.div`
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
