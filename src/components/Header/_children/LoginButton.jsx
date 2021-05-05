import React from "react";
import { useAppContext } from "../../../context/app/appContext";
import Modal from "../../layout/Modal";
import styled from "styled-components";

const StyledButton = styled.button`
  justify-self: end;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  color: #c0c0c0;
  background-color: transparent;
  border: solid 1px #c0c0c0;
  border-radius: 14px;
  margin: 0 10px;
  padding: 8px 12px;
  min-width: 74px;
  cursor: pointer;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
  :focus {
    opacity: 1;
  }
`;

const LoginButton = () => {
  const {
    currentUser,
    shouldShowLogin,
    activateLogin,
    logOutUser,
  } = useAppContext();

  const onClick = () => {
    if (currentUser.isLoggedIn) {
      logOutUser();
    } else {
      activateLogin();
    }
  };

  return (
    <div>
      <StyledButton onClick={onClick}>
        {currentUser.isLoggedIn ? "Log out" : "Sign up"}
      </StyledButton>
      {shouldShowLogin && <Modal />}
    </div>
  );
};

export default LoginButton;
