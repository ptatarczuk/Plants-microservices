import styled from "styled-components";

export const MessagesContainer = styled.div`
  //   background-color: lightgrey;
  height: 100%;
  width: 85%;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
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
