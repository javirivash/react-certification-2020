import React, { Fragment } from "react";
import { useAppContext } from "../../context/app/appContext";
import styled from "styled-components";
import VideoList from "../VideoList/VideoList";
const StyledContainer = styled.div`
  background-color: ${(props) => props.theme.background};
  margin: 64px auto 35px;
  padding-top: 35px;
`;
const FavoritesView = () => {
  const { currentFavorites } = useAppContext();
  const favoritesTitle = (
    <Fragment>
      {currentFavorites.length > 0
        ? "These are your favorite videos"
        : "Your favorite videos will show here"}
    </Fragment>
  );

  return (
    <StyledContainer>
      <VideoList listTitle={favoritesTitle} videos={currentFavorites} />
    </StyledContainer>
  );
};

export default FavoritesView;
