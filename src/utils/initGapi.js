/* global gapi */
/* eslint-disable no-undef */
const initGapi = async () => {
  let apiKey;
  let discovery = {};

  if (process.env.REACT_APP_YOUTUBE_API_KEY) {
    apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  } else {
    apiKey = process.env.YOUTUBE_API_KEY;
  }

  const handleClientInit = async (resolve) => {
    try {
      await gapi.client.init({
        apiKey: apiKey,
        discoveryDocs: [discovery],
      });
      resolve();
    } catch (error) {
      console.error("handleClientInit: Something went wrong... ", error);
    }
  };

  try {
    const response = await fetch(
      "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
    );
    discovery = await response.json();
    return new Promise((resolve) => {
      gapi.load("client", () => {
        handleClientInit(resolve);
      });
    });
  } catch (error) {
    console.error("handleClientLoad: Something went wrong... ", error);
  }
};

export default initGapi;
