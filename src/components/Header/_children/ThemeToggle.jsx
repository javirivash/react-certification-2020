import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../../context/app/appContext";

const StyledButton = styled.button`
  color: ${(props) => props.theme.icon};
  background-color: ${(props) => props.theme.toggle};
  border: none;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
  :focus {
    opacity: 1;
  }
`;

const ThemeToggle = () => {
  const { toggleTheme } = useAppContext();

  const onClick = () => {
    toggleTheme();
  };

  return (
    <StyledButton onClick={onClick} className="material-icons">
      dark_mode
    </StyledButton>
  );
};

export default ThemeToggle;
