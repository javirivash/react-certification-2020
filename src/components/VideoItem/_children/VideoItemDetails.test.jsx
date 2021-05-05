import React from "react";
import { render, screen } from "@testing-library/react";
import AppContext from "../../../context/app/appContext";
import { currentUser, selectedVideo } from "../../../utils/testMocks";
import VideoItemDetails from "./VideoItemDetails";

describe("VideoItemDetails", () => {
  const renderComponent = (contextValue = {}) => {
    render(
      <AppContext.Provider
        value={{
          currentUser,
          ...contextValue,
        }}
      >
        <VideoItemDetails video={selectedVideo} />
      </AppContext.Provider>
    );
  };
  const { title, channelTitle } = selectedVideo;

  it("renders video title", () => {
    renderComponent();
    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
  });

  it("renders video description", () => {
    renderComponent();
    expect(screen.getByRole("description")).toBeInTheDocument();
  });

  it("renders channel name", () => {
    renderComponent();
    expect(
      screen.getByRole("heading", { name: channelTitle })
    ).toBeInTheDocument();
  });

  describe("Favorite Button", () => {
    it("renders button when there is an user logged in", () => {
      renderComponent();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("does not render button when there is no user logged in", () => {
      renderComponent({ currentUser: {} });
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });
});
