import React from "react";
import { render, screen } from "@testing-library/react";
import AppContext from "../../context/app/appContext";
import AlertContext from "../../context/alert/alertContext";
import { currentUser } from "../../utils/testMocks";
import Header from "./Header";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => [],
  useLocation: () => ({ pathname: "/" }),
}));

describe("Header", () => {
  const shouldShowMenu = false;
  const shouldShowLogin = true;
  const toggleMenu = jest.fn();
  const setAlert = jest.fn();
  const initApis = jest.fn();
  const activateLogin = jest.fn();
  const logOutUser = jest.fn();
  const toggleTheme = jest.fn();
  const getResultVideos = jest.fn();

  const renderComponent = (contextValue = {}) => {
    render(
      <AlertContext.Provider value={{ setAlert }}>
        <AppContext.Provider
          value={{
            currentUser,
            shouldShowMenu,
            shouldShowLogin,
            toggleMenu,
            initApis,
            getResultVideos,
            activateLogin,
            logOutUser,
            toggleTheme,
            ...contextValue,
          }}
        >
          <Header />
        </AppContext.Provider>
      </AlertContext.Provider>
    );
  };

  beforeAll(() => {
    window.scrollTo = jest.fn();
    window.scroll = jest.fn();
  });
  afterAll(() => {
    window.scrollTo.mockClear();
    window.scroll.mockClear();
  });

  it("renders menu button", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "menu" })).toBeInTheDocument();
  });

  it("renders search input", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("renders sign up button", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
  });

  it("renders theme toggle", () => {
    renderComponent();
    expect(
      screen.getByRole("button", { name: "dark_mode" })
    ).toBeInTheDocument();
  });
});
