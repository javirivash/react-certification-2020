import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    a {
    text-decoration: none
    }
  }
`;

export const lightTheme = {
  background: "#fff",
  item: "#f8f8f8",
  itemHover: "#f0f0f0",
  dialog: "#fefefe",
  alert: "#ededed",
  shadow: "0px 5px 24px rgba(0, 0, 0, 0.4)",
  primaryText: "#000",
  secondaryText: "#010101",
  icon: "#fff",
  toggle: "transparent",
};

export const darkTheme = {
  background: "#121212",
  item: "#141414",
  itemHover: "#161616",
  dialog: "#202020",
  alert: "#202020",
  shadow: "none",
  primaryText: "#c0c0c0",
  secondaryText: "#999",
  icon: "#000",
  toggle: "#feb742",
};
