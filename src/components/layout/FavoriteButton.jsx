import React from "react";
import { useAppContext } from "../../context/app/appContext";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  font-size: 24px;
  color: ${(props) => props.theme.primaryText};
  background-color: transparent;
  border: none;
  border-radius: 3px;
  width: 34px;
  height: 28px;
  cursor: pointer;
  opacity: 1;

  :hover {
    color: ${(props) => props.theme.primaryText};
    font-size: 28px;
  }
  :focus {
    outline: none;
  }
`;
const FavoriteButton = ({ video }) => {
  const { currentUser, addFavorite, removeFavorite } = useAppContext();

  const toggleFavorite = (e) => {
    video.isFavorite
      ? removeFavorite(video.id)
      : addFavorite({ ...video, isFavorite: true });
    video.isFavorite = !video.isFavorite;
    e.stopPropagation();
  };

  if (!currentUser.isLoggedIn) return null;
  return (
    <StyledButton
      onClick={toggleFavorite}
      type="button"
      className="material-icons"
    >
      {video.isFavorite ? "favorite" : "favorite_border"}
    </StyledButton>
  );
};

FavoriteButton.propTypes = {
  video: PropTypes.object.isRequired,
};
export default FavoriteButton;
