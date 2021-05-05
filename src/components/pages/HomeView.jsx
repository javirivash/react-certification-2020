import React, { Fragment } from "react";
import VideoList from "../VideoList/VideoList";
import { useAppContext } from "../../context/app/appContext";
import styled from "styled-components";

const MainTitle = styled.h1`
  font-family: "Oswald", sans-serif;
  font-size: 48px;
  text-align: center;
  color: ${(props) => props.theme.primaryText};
  margin: 64px auto 35px;
  padding-top: 20px;

  @media only screen and (max-width: 420px) {
    font-size: 38px;
  }
`;

const HomeView = () => {
  const { searchText, resultVideos } = useAppContext();
  const searchTitle = (
    <Fragment>
      Showing search results for <i>{searchText}</i>
    </Fragment>
  );
  return (
    <Fragment>
      <MainTitle>Welcome to YouTubit</MainTitle>
      <VideoList listTitle={searchTitle} videos={resultVideos}></VideoList>
    </Fragment>
  );
};

export default HomeView;
