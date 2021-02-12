import firebase from "../../config";

export function fetchUser() {
  return async (dispatch) => {
    const snapshot = await firebase
      .firestore()
      .collection("users")
      .doc("user1")
      .get();

    if (snapshot.exists) {
      dispatch({ type: "USER_STATE_CHANGE", currentUser: snapshot.data() });
    } else {
      console.log("error redux");
    }
  };
}

export function fetchBooks() {
  return async (dispatch) => {
    const books = [];

    const snapshot = await firebase
      .firestore()
      .collection("psbZ8fEurdhxElHDqz2PLezKGIz1")
      .get();

    snapshot.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });

    dispatch({ type: "SET_BOOKS", books });
  };
}
