import styled, { keyframes } from "styled-components";

export const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;

  background-color: rgba(255, 255, 255, 0.3);
  background-blend-mode: overlay;
  background-image: url(/pexels-charlotte-may-5824877.jpg);
  background-size: cover;
  overflow: auto;

  position: relative;
`;

const loaderAnimation = keyframes`
  100% {
    transform: rotate(1turn);
  }
`;

export const Loader = styled.div`
  --d: 32px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  color: #25b09b;
  box-shadow:
    calc(1 * var(--d)) calc(0 * var(--d)) 0 0,
    calc(0.707 * var(--d)) calc(0.707 * var(--d)) 0 1px,
    calc(0 * var(--d)) calc(1 * var(--d)) 0 2px,
    calc(-0.707 * var(--d)) calc(0.707 * var(--d)) 0 3px,
    calc(-1 * var(--d)) calc(0 * var(--d)) 0 4px,
    calc(-0.707 * var(--d)) calc(-0.707 * var(--d)) 0 5px,
    calc(0 * var(--d)) calc(-1 * var(--d)) 0 6px;
  animation: ${loaderAnimation} 1s infinite steps(8);
`;
