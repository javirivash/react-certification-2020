/*global firebase */
/* eslint-disable no-undef */

const initFirebase = () => {
  const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;
  const firebaseProjectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
  const firebaseAppId = process.env.REACT_APP_FIREBASE_APP_ID;

  const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: `${firebaseProjectId}.firebaseapp.com`,
    databaseURL: `https://${firebaseProjectId}-default-rtdb.firebaseio.com`,
    projectId: `${firebaseProjectId}`,
    storageBucket: `${firebaseProjectId}.appspot.com`,
    messagingSenderId: "941718889832",
    appId: firebaseAppId,
    measurementId: "G-Q29WYTQKD1",
  };
  firebase.initializeApp(firebaseConfig);
};

export default initFirebase;
