import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLOR_5, COLOR_BLACK } from "../../constants/constants";

export const RegisterLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RegisterLink = styled.span`
  margin-top: 16px;
  text-decoration: none;
  color: ${COLOR_BLACK};
  font-weight: 600;
`;

export const RegisterLinkSpan = styled(Link)`
  color: ${COLOR_5};
  font-weight: 800;
  padding-left: 4px;
`;
