import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppContext from "../../context/app/appContext";
import { currentUser, selectedVideo } from "../../utils/testMocks";
import VideoItem from "./VideoItem";
jest.mock("react-router-dom", () => ({
  useHistory: () => [],
  useLocation: () => ({ pathname: "/" }),
}));

describe("VideoItem", () => {
  const getRelatedVideos = jest.fn();
  const renderComponent = (contextValue = {}) => {
    render(
      <AppContext.Provider
        value={{
          currentUser,
          getRelatedVideos,
          ...contextValue,
        }}
      >
        <VideoItem video={selectedVideo} />
      </AppContext.Provider>
    );
  };

  beforeAll(() => {
    window.scrollTo = jest.fn();
  });
  afterAll(() => {
    window.scrollTo.mockClear();
  });

  it("renders video details ", () => {
    renderComponent();
    expect(screen.getByRole("videoItemDetails")).toBeInTheDocument();
  });

  it("renders thumbnail", () => {
    renderComponent();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      selectedVideo.thumbnail
    );
  });

  it("calls getRelatedVideos when clicking the item", () => {
    renderComponent();
    userEvent.click(screen.getByRole("videoItem"));
    expect(getRelatedVideos).toHaveBeenCalledWith(selectedVideo, "/");
  });
});
