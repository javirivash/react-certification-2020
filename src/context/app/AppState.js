/* global gapi, firebase*/
/* eslint-disable react/prop-types */
import React, { useReducer } from "react";
import AppContext from "./appContext";
import AppReducer from "./appReducer";
import initGapi from "../../utils/initGapi";
import initFirebase from "../../utils/initFirebase";
import validateItems from "../../utils/validateItems";
import getFavorites from "../../utils/getFavorites";
import updateLocalFavorites from "../../utils/updateLocalFavorites";
import { useAlertContext } from "../alert/alertContext";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./themes";
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

const AppState = ({ children }) => {
  const initialState = {
    searchText: "Wizeline Academy",
    resultVideos: [],
    selectedVideo: {},
    relatedVideos: [],
    currentUser: {},
    currentFavorites: [],
    shouldShowMenu: false,
    shouldShowLogin: false,
    loading: true,
    theme: "light",
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);
  const { setAlert } = useAlertContext();

  // INIT APIS
  const initApis = async () => {
    await initGapi();
    getResultVideos(state.searchText);
    initFirebase();
  };

  // GET RESULT VIDEOS
  const getResultVideos = async (query) => {
    setLoading();
    let updatedLocalFavorites = updateLocalFavorites(
      state.resultVideos,
      state.relatedVideos,
      state.currentFavorites
    );

    try {
      const response = await gapi.client.youtube.search.list({
        part: ["snippet"],
        maxResults: 50,
        q: query,
        type: ["video"],
      });
      const resultVideos = validateItems(response.result.items);
      updatedLocalFavorites = updateLocalFavorites(
        resultVideos,
        state.relatedVideos,
        state.currentFavorites
      );
    } catch (error) {
      setAlert("Error: Failed fetching results");
      console.error("getResultVideos: Something went wrong... ", error);
    }

    dispatch({
      type: GET_RESULT_VIDEOS,
      payload: { query, updatedLocalFavorites },
    });
  };

  // GET RELATED VIDEOS
  const getRelatedVideos = async (video, pathname) => {
    setLoading();
    let updatedLocalFavorites = {
      results: state.resultVideos,
      related: state.relatedVideos,
      favorites: state.currentFavorites,
    };
    if (!pathname.includes("/favorites")) {
      try {
        const response = await gapi.client.youtube.search.list({
          part: ["snippet"],
          maxResults: 50,
          type: ["video"],
          relatedToVideoId: video.id,
        });
        const relatedVideos = validateItems(response.result.items);
        updatedLocalFavorites = updateLocalFavorites(
          state.resultVideos,
          relatedVideos,
          state.currentFavorites
        );
      } catch (error) {
        setAlert("Error: Failed fetching results");
        console.error("getRelatedVideos: Something went wrong... ", error);
      }
    }

    dispatch({
      type: GET_RELATED_VIDEOS,
      payload: { video, updatedLocalFavorites },
    });
  };

  // SET LOADING
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  // TOGGLE THEME
  const toggleTheme = () => {
    const updatedTheme = state.theme === "light" ? "dark" : "light";
    dispatch({ type: TOGGLE_THEME, payload: updatedTheme });
  };

  // ACTIVATE LOGIN
  const activateLogin = () => {
    dispatch({ type: ACTIVATE_LOGIN });
  };

  // DEACTIVATE LOGIN
  const deactivateLogin = () => {
    dispatch({ type: DEACTIVATE_LOGIN });
  };

  //TOGGLE MENU
  const toggleMenu = () => {
    const updatedState = !state.shouldShowMenu;
    dispatch({ type: TOGGLE_MENU, payload: updatedState });
  };

  // SIGN UP USER
  const signUpUser = async (email, password) => {
    let user;
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      user = {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        isLoggedIn: true,
      };
      deactivateLogin();
      setAlert(`You've successfully signed up as ${user.email}`);
    } catch (error) {
      user = {};
      setAlert("Error while signing up: " + error.message);
    }

    dispatch({
      type: SIGN_UP_USER,
      payload: user,
    });
  };

  // LOG IN USER
  const logInUser = async (email, password) => {
    let user = {};
    let updatedLocalFavorites = {
      results: state.resultVideos,
      related: state.relatedVideos,
      favorites: state.currentFavorites,
    };
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      user = {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        isLoggedIn: true,
      };
      const favorites = await getFavorites(user.id);
      updatedLocalFavorites = updateLocalFavorites(
        state.resultVideos,
        state.relatedVideos,
        favorites
      );
      deactivateLogin();
      setAlert(`You've successfully logged in as ${user.email}`);
    } catch (error) {
      setAlert("Error while logging in: " + error.message);
    }

    dispatch({
      type: LOG_IN_USER,
      payload: { user, updatedLocalFavorites },
    });
  };

  // LOG OUT USER
  const logOutUser = async () => {
    try {
      await firebase.auth().signOut();
      setAlert("You have successfully logged out");
    } catch (error) {
      setAlert("There was a problem while logging out");
    }

    dispatch({
      type: LOG_OUT_USER,
    });
  };

  // ADD FAVORITE
  const addFavorite = async (video) => {
    const userId = state.currentUser.id;
    const userData = firebase.database().ref("users/" + userId);
    let updatedLocalFavorites = {
      results: state.resultVideos,
      related: state.relatedVideos,
      favorites: state.currentFavorites,
    };
    try {
      await userData.child(video.id).set(video);
      const favorites = await getFavorites(userId);
      updatedLocalFavorites = updateLocalFavorites(
        state.resultVideos,
        state.relatedVideos,
        favorites
      );
      setAlert("Added to Favorites");
    } catch (error) {
      setAlert("There was an error while adding to Favorites");
    }
    dispatch({
      type: ADD_FAVORITE,
      payload: updatedLocalFavorites,
    });
  };

  // REMOVE FAVORITE
  const removeFavorite = async (videoId) => {
    const userId = state.currentUser.id;
    const userData = firebase.database().ref("users/" + userId);
    let updatedLocalFavorites = {
      results: state.resultVideos,
      related: state.relatedVideos,
      favorites: state.currentFavorites,
    };
    try {
      await userData.child(videoId).remove();
      const favorites = await getFavorites(userId);
      updatedLocalFavorites = updateLocalFavorites(
        state.resultVideos,
        state.relatedVideos,
        favorites
      );
      setAlert("Removed from Favorites");
    } catch (error) {
      setAlert("There was an error while removing from Favorites");
    }

    dispatch({
      type: REMOVE_FAVORITE,
      payload: updatedLocalFavorites,
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        initApis,
        getResultVideos,
        getRelatedVideos,
        setLoading,
        toggleTheme,
        activateLogin,
        deactivateLogin,
        toggleMenu,
        signUpUser,
        logInUser,
        logOutUser,
        addFavorite,
        removeFavorite,
      }}
    >
      <ThemeProvider theme={state.theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default AppState;
