import React, { Fragment, useState } from "react";
import Header from "./components/Header";
import VideoList from "./components/VideoList";
import VideoDetailsView from "./components/VideoDetailsView";
import Spinner from "./components/layout/Spinner";
import useApiSearch from "./hooks/useApiSearch";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const MainTitle = styled.h1`
  font-family: "Oswald", sans-serif;
  font-size: 48px;
  text-align: center;
  margin: 90px auto 35px;
`;

const Content = styled.div`
  padding: 0 30px;
  margin: 1px solid blue;
`;

const App = () => {
  const [searchText, setSearchText] = useState("Wizeline Academy");
  const [shouldShowSearch, setShouldShowSearch] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [resultVideos, loading] = useApiSearch(searchText, selectedVideo);

  const handleSearch = (text) => {
    setSearchText(text);
    setShouldShowSearch(true);
  };

  const handleSelectedVideo = (videoProps) => {
    setSelectedVideo(videoProps);
    setShouldShowSearch(false);
  };

  return (
    <Fragment>
      <GlobalStyle />
      <div className="App">
        <Header handleSearch={handleSearch} />
        {loading ? (
          <Spinner />
        ) : (
          <Content>
            {shouldShowSearch ? (
              <Fragment>
                <MainTitle>Welcome to YouTubit</MainTitle>
                <VideoList
                  resultVideos={resultVideos}
                  handleSelectedVideo={handleSelectedVideo}
                />
              </Fragment>
            ) : (
              <VideoDetailsView
                selectedVideo={selectedVideo}
                resultVideos={resultVideos}
                handleSelectedVideo={handleSelectedVideo}
              />
            )}
          </Content>
        )}
      </div>
    </Fragment>
  );
};

export default App;