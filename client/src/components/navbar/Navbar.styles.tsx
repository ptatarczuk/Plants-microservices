import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  COLOR_1,
  COLOR_2,
  COLOR_3,
  COLOR_4,
  COLOR_5,
  COLOR_BLACK,
  MIN_WIDTH,
  NAVBAR_HEIGHT,
} from "../../constants/constants";

export const NavbarContainer = styled.div`
  height: 100%;
  // background-color: ${COLOR_5};
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

export const NavbarLinks = styled.div`
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

export const LinkBox = styled.div`
  // background-color: blue;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const NavbarLink = styled(Link)`
  text-decoration: none;
  color: ${COLOR_BLACK};
  font-size: 24px;
  word-break: break-all;

  &:hover {
    cursor: pointer;
    color: grey;
  }
`;

export const LinkGroup = styled.div`
  gap: 16px;

  width: 90%;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  // background-color: yellow;
`;
