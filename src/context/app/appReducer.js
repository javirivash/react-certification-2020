import {
  GET_RESULT_VIDEOS,
  GET_RELATED_VIDEOS,
  SET_LOADING,
  TOGGLE_THEME,
  ACTIVATE_LOGIN,
  DEACTIVATE_LOGIN,
  TOGGLE_MENU,
  SIGN_UP_USER,
  LOG_IN_USER,
  LOG_OUT_USER,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_RESULT_VIDEOS:
      return {
        ...state,
        searchText: action.payload.query,
        resultVideos: action.payload.updatedLocalFavorites.results,
        relatedVideos: action.payload.updatedLocalFavorites.related,
        currentFavorites: action.payload.updatedLocalFavorites.favorites,
        loading: false,
      };
    case GET_RELATED_VIDEOS:
      return {
        ...state,
        selectedVideo: action.payload.video,
        resultVideos: action.payload.updatedLocalFavorites.results,
        relatedVideos: action.payload.updatedLocalFavorites.related,
        currentFavorites: action.payload.updatedLocalFavorites.favorites,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TOGGLE_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case ACTIVATE_LOGIN:
      return {
        ...state,
        shouldShowLogin: true,
      };
    case DEACTIVATE_LOGIN:
      return {
        ...state,
        shouldShowLogin: false,
      };
    case TOGGLE_MENU:
      return {
        ...state,
        shouldShowMenu: action.payload,
      };
    case SIGN_UP_USER:
      return {
        ...state,
        currentUser: action.payload,
        currentFavorites: [],
      };
    case LOG_IN_USER:
      return {
        ...state,
        currentUser: action.payload.user,
        resultVideos: action.payload.updatedLocalFavorites.results,
        relatedVideos: action.payload.updatedLocalFavorites.related,
        currentFavorites: action.payload.updatedLocalFavorites.favorites,
      };
    case LOG_OUT_USER:
      return {
        ...state,
        currentUser: {},
        currentFavorites: [],
      };
    case ADD_FAVORITE:
      return {
        ...state,
        resultVideos: action.payload.results,
        relatedVideos: action.payload.related,
        currentFavorites: action.payload.favorites,
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        resultVideos: action.payload.results,
        relatedVideos: action.payload.related,
        currentFavorites: action.payload.favorites,
      };
    default:
      return state;
  }
};
