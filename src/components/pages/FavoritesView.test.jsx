import React from "react";
import { render, screen } from "@testing-library/react";
import FavoritesView from "./FavoritesView";
import AppContext from "../../context/app/appContext";
import { currentUser, currentFavorites } from "../../utils/testMocks";
jest.mock("react-router-dom", () => ({
  useHistory: () => [],
  useLocation: () => ({ pathname: "/favorites" }),
}));

describe("FavoritesView", () => {
  const renderComponent = (contextValue = {}) => {
    render(
      <AppContext.Provider
        value={{
          currentUser,
          currentFavorites,
          ...contextValue,
        }}
      >
        <FavoritesView />
      </AppContext.Provider>
    );
  };

  it("renders videos list title", () => {
    renderComponent();
    expect(
      screen.getByRole("heading", { name: /These are your favorite videos/i })
    ).toBeInTheDocument();
  });

  it("renders alternative title when there are no favorite videos", () => {
    renderComponent({ currentFavorites: [] });
    expect(
      screen.getByRole("heading", {
        name: /Your favorite videos will show here/i,
      })
    ).toBeInTheDocument();
  });

  it("renders videos list", () => {
    renderComponent();
    expect(screen.getByRole("videoList")).toBeInTheDocument();
  });
});
