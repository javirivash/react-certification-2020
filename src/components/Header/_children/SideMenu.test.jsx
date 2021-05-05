import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppContext from "../../../context/app/appContext";
import { currentUser } from "../../../utils/testMocks";
import { MemoryRouter } from "react-router-dom";
import SideMenu from "./SideMenu";

describe("SideMenu", () => {
  const shouldShowMenu = true;
  const toggleMenu = jest.fn();
  const renderComponent = (contextValue = {}) => {
    render(
      <AppContext.Provider
        value={{
          currentUser,
          shouldShowMenu,
          toggleMenu,
          ...contextValue,
        }}
      >
        <MemoryRouter>
          <SideMenu />
        </MemoryRouter>
      </AppContext.Provider>
    );
  };

  beforeAll(() => {
    window.scrollTo = jest.fn();
  });
  afterAll(() => {
    window.scrollTo.mockClear();
  });

  describe("when there is an user logged in", () => {
    it("shows Home link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
    });

    it("shows Favorites link", () => {
      renderComponent();
      expect(
        screen.getByRole("link", { name: /Favorite/i })
      ).toBeInTheDocument();
    });

    it("resets the scroll position when clicking either link", () => {
      renderComponent();
      userEvent.click(screen.getByRole("link", { name: /Home/i }));
      userEvent.click(screen.getByRole("link", { name: /Favorite/i }));
      expect(window.scrollTo).toHaveBeenCalledTimes(2);
    });
  });

  describe("when there is no user logged in", () => {
    it("shows Home link", () => {
      renderComponent({ currentUser: {} });
      expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
    });

    it("does not show Favorites link", () => {
      renderComponent({ currentUser: {} });
      expect(screen.queryAllByRole("link", { name: /Favorites/i }).length).toBe(
        0
      );
    });
  });
});
