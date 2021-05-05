import React, { Fragment } from "react";
import styled from "styled-components";
import MenuButton from "./_children/MenuButton";
import SideMenu from "./_children/SideMenu";
import Search from "./_children/Search";
import LoginButton from "./_children/LoginButton";
import ThemeToggle from "./_children/ThemeToggle";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 1;
  top: 0;
  background-color: rgb(24, 24, 24, 0.99);
  width: 100%;
  height: 64px;
  padding: 16px;

  * {
    text-align: center;
    height: 34px;
  }

  *:focus {
    outline: none;
  }
`;

const Header = () => {
  return (
    <Fragment>
      <Container>
        <MenuButton />
        <Search />
        <LoginButton />
        <ThemeToggle />
      </Container>
      <SideMenu />
    </Fragment>
  );
};

export default Header;
