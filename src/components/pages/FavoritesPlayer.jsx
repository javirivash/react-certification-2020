import React, { Fragment } from "react";
import styled from "styled-components";
import Player from "../Player/Player";
import PlayerDetails from "../Player/PlayerDetails";
import VideoList from "../VideoList/VideoList";
import { useAppContext } from "../../context/app/appContext";

const StyledContainer = styled.div`
  margin: 64px auto 0;
  width: 100%;
`;

const PlayerView = () => {
  const { currentFavorites, selectedVideo } = useAppContext();

  const notPlayingFavorites = currentFavorites.filter((video) => {
    return video.id !== selectedVideo.id;
  });

  const moreFavoritesTitle = (
    <Fragment>
      {notPlayingFavorites.length > 0
        ? "More of your favorites"
        : "Add more favorites to watch"}
    </Fragment>
  );

  return (
    <StyledContainer>
      <Player />
      <PlayerDetails />
      <VideoList listTitle={moreFavoritesTitle} videos={notPlayingFavorites} />
    </StyledContainer>
  );
};

export default PlayerView;
