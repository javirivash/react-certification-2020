import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../context/app/appContext";

const StyledContainer = styled.div`
  max-width: 950px;
  max-height: 534px;
  margin: auto;
`;
const StyledWrapper = styled.div`
  position: relative;
  z-index: 0;
  overflow: hidden;
  padding-top: 56.25%;
`;
const StyledIFrame = styled.iframe`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const Player = () => {
  const {
    selectedVideo: { id },
  } = useAppContext();

  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledIFrame
          role="presentation"
          type="text/html"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          allow="autoplay; fullscreen"
        ></StyledIFrame>
      </StyledWrapper>
    </StyledContainer>
  );
};

export default Player;
