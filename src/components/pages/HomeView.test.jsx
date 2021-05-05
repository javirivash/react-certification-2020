import React from "react";
import { render, screen } from "@testing-library/react";
import AppContext from "../../context/app/appContext";
import { currentUser, resultVideos } from "../../utils/testMocks";
import HomeView from "./HomeView";
jest.mock("react-router-dom", () => ({
  useHistory: () => [],
  useLocation: () => ({ pathname: "/" }),
}));

describe("HomeView", () => {
  const searchText = "";
  const renderComponent = (contextValue = {}) => {
    render(
      <AppContext.Provider
        value={{
          searchText,
          currentUser,
          resultVideos,
          ...contextValue,
        }}
      >
        <HomeView />
      </AppContext.Provider>
    );
  };

  it("renders the main title", () => {
    renderComponent();
    expect(
      screen.getByRole("heading", { name: /Welcome to YouTubit/i })
    ).toBeInTheDocument();
  });

  it("renders the videos list title including search text", () => {
    renderComponent({ searchText: "Messi" });
    expect(
      screen.getByRole("heading", { name: /Showing search results for Messi/i })
    ).toBeInTheDocument();
  });

  it("renders the videos list", () => {
    renderComponent();
    expect(screen.getByRole("videoList")).toBeInTheDocument();
  });
});
