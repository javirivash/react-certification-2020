import React from "react";
import { useAppContext } from "../../context/app/appContext";
import { StyledTitle } from "../VideoList/VideoList";
import styled from "styled-components";
import FavoriteButton from "../layout/FavoriteButton";

const StyledContainer = styled.div`
  font-family: "DM Sans", sans-serif;
  margin: auto;
  max-width: 950px;
  padding: 24px 0 70px;
`;

const StyledFlex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledDescription = styled.p`
  font-size: 16px;
  line-height: 24px;

  color: ${(props) => props.theme.secondaryText};
  max-height: 170px;
  overflow-wrap: anywhere;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StyledChannel = styled.h1`
  font-size: 16px;
  color: ${(props) => props.theme.secondaryText};
  margin-top: 24px;
`;

const PlayerDetails = () => {
  const { selectedVideo } = useAppContext();
  const { title, description, channelTitle } = selectedVideo;

  return (
    <StyledContainer role="playerDetails">
      <StyledFlex>
        <StyledTitle>{title}</StyledTitle>
        <FavoriteButton video={selectedVideo} />
      </StyledFlex>
      <StyledDescription>{description}</StyledDescription>
      <StyledChannel>Posted by {channelTitle}</StyledChannel>
    </StyledContainer>
  );
};

export default PlayerDetails;
