/*global firebase*/
const getFavorites = async (userId) => {
  const userData = firebase.database().ref("users/" + userId);
  let favorites = [];
  try {
    const snapshot = await userData.get();
    if (snapshot.val()) {
      favorites = Object.values(snapshot.val());
    }
  } catch (error) {
    console.error(error);
  }
  return favorites;
};

export default getFavorites;
