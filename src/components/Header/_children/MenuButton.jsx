import React from "react";
import { useAppContext } from "../../../context/app/appContext";
import styled from "styled-components";

const StyledButton = styled.button`
  color: #c0c0c0;
  background-color: transparent;
  border: none;
  border-radius: 3px;
  margin-right: 94px;
  width: 34px;
  cursor: pointer;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
  :focus {
    opacity: 1;
  }
  @media only screen and (max-width: 580px) {
    margin-right: 10px;
  }
`;

const MenuButton = () => {
  const { shouldShowMenu, toggleMenu } = useAppContext();

  return (
    <StyledButton onClick={toggleMenu} className="material-icons">
      {shouldShowMenu ? "close" : "menu"}
    </StyledButton>
  );
};

export default MenuButton;
