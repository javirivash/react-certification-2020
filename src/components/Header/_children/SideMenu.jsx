import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../context/app/appContext";
import styled from "styled-components";

const StyledMenu = styled.div`
  position: fixed;
  z-index: 2;
  top: 64px;
  left: ${(props) => (props.shouldShowMenu ? "0" : "-66px")};
  background-color: rgb(28, 28, 28, 0.99);
  color: #c0c0c0;
  border-radius: 0 0 5px 5px;
  width: 66px;
  height: 100%;
  transition: all 0.4s ease-out;
  a {
    display: block;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    line-height: 38px;
    text-align: center;
    color: #c0c0c0;
    background-color: transparent;
    border: none;
    width: 100%;
    height: 66px;
    padding: 21px;
    opacity: 0.7;
    :hover {
      background-color: rgb(30, 30, 30, 0.97);
      border-radius: 0 0 5px 5px;
    }
    :focus {
      border-radius: 0 0 5px 5px;
      opacity: 1;
      outline: none;
    }
  }
`;
const StyledPage = styled.div`
  display: ${(props) => (props.shouldShowMenu ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 66px;
  bottom: 0;
  right: 0;
`;

const SideMenu = () => {
  const { currentUser, shouldShowMenu, toggleMenu } = useAppContext();
  const onClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      <StyledMenu shouldShowMenu={shouldShowMenu} onClick={toggleMenu}>
        <Link to={"/"} onClick={onClick} replace>
          <span className="material-icons">home</span>
        </Link>
        {currentUser.isLoggedIn && (
          <Link to={"/favorites"} onClick={onClick} replace>
            <span className="material-icons">favorite</span>
          </Link>
        )}
      </StyledMenu>
      <StyledPage shouldShowMenu={shouldShowMenu} onClick={toggleMenu} />
    </Fragment>
  );
};

export default SideMenu;
