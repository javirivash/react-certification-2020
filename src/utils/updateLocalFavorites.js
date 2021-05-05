const updateLocalFavorites = (resultVideos, relatedVideos, favorites) => {
  const updatedLocalFavorites = {
    results: resultVideos,
    related: relatedVideos,
    favorites: favorites,
  };

  const updateRemovedFavorites = (videos, favorites) => {
    return videos.map((video) => {
      if (video.isFavorite) {
        video.isFavorite = favorites.some((favorite) => {
          return video.id === favorite.id;
        });
      }
      return video;
    });
  };

  const updateAddedFavorite = (videos, favorite) => {
    return videos.map((video) => {
      if (favorite.id == video.id) {
        video.isFavorite = true;
      }
      return video;
    });
  };

  // UPDATE REMOVED FAVORITES FROM RESULTS
  updatedLocalFavorites.results = updateRemovedFavorites(
    resultVideos,
    favorites
  );

  // UPDATE REMOVED FAVORITES FROM RELATED
  updatedLocalFavorites.related = updateRemovedFavorites(
    relatedVideos,
    favorites
  );

  favorites.forEach((favorite) => {
    // ADD FAVORITE TO RESULTS
    updatedLocalFavorites.results = updateAddedFavorite(resultVideos, favorite);

    // ADD FAVORITE TO RELATED
    updatedLocalFavorites.related = updateAddedFavorite(
      relatedVideos,
      favorite
    );
  });
  return updatedLocalFavorites;
};

export default updateLocalFavorites;
