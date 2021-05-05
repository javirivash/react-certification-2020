import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FavoriteButton from "../../layout/FavoriteButton";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding-right: 12px;
`;

const StyledTitle = styled.h1`
  display: inline-block;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  line-height: 22px;
  color: ${(props) => props.theme.primaryText};
  height: 42px;
  overflow-wrap: anywhere;
  overflow: hidden;
`;

const StyledDescription = styled.p`
  font-family: "DM Sans", sans-serif;
  font-size: 12px;
  line-height: 20px;
  color: ${(props) => props.theme.secondaryText};
  height: 60px;
  overflow-wrap: anywhere;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StyledChannel = styled.h1`
  font-family: "DM Sans", sans-serif;
  font-size: 12px;
  color: ${(props) => props.theme.secondaryText};
  height: 20px;
  overflow-wrap: anywhere;
  overflow: hidden;
`;

const StyledFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VideoItemDetails = ({ video }) => {
  const { title, description, channelTitle } = video;

  return (
    <StyledContainer role="videoItemDetails">
      <StyledTitle>{title}</StyledTitle>
      <StyledDescription role="description">{description}</StyledDescription>
      <StyledFlex>
        <FavoriteButton video={video} />
        <StyledChannel>{channelTitle}</StyledChannel>
      </StyledFlex>
    </StyledContainer>
  );
};

VideoItemDetails.propTypes = {
  video: PropTypes.object.isRequired,
};

export default VideoItemDetails;
