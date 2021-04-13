import React, { useContext } from "react";
import styled from "styled-components";
import AppContext from "../../../context/appContext";

const Container = styled.div`
  max-width: 950px;
  max-height: 534px;
  margin: auto;

  .wrapper {
    position: relative;
    z-index: 0;
    overflow: hidden;
    padding-top: 56.25%;
  }

  #player {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const Player = () => {
  const appContext = useContext(AppContext);
  const {
    selectedVideo: { id },
  } = appContext;

  return (
    <Container>
      <div className="wrapper">
        <iframe
          id="player"
          role="application"
          type="text/html"
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          allow="autoplay; fullscreen"
        ></iframe>
      </div>
    </Container>
  );
};

export default Player;