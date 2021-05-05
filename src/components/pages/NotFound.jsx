import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledContainer = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.primaryText};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 64px;
  padding-top: 64px;
  opacity: 0.7;
`;

const StyledTitle = styled.h1`
  font-family: "Roboto", sans-serif;
  font-size: 32px;
  text-align: center;
  color: ${(props) => props.theme.primaryText};
  margin-bottom: 30px;
  span {
    font-size: 42px;
    vertical-align: middle;
    margin-right: 12px;
  }
`;
const StyledDescription = styled.h1`
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  color: ${(props) => props.theme.primaryText};
`;

const NotFound = () => {
  const { pathname } = useLocation();
  return (
    <StyledContainer>
      <StyledTitle>
        <span className="material-icons">smart_display</span>
        Page Not Found
      </StyledTitle>
      <StyledDescription>
        No page matches the route <i>{pathname}</i>
      </StyledDescription>
    </StyledContainer>
  );
};

export default NotFound;
