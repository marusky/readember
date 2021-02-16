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

// Books
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

export function addBook(book) {
  console.log(firebase.auth().currentUser.uid);
  return async (dispatch) => {
    try {
      const res = await firebase
        .firestore()
        .collection(firebase.auth().currentUser.uid)
        .doc(book.id)
        .set(book);

      dispatch({ type: "ADD_BOOK", book, open: false });
    } catch (err) {
      console.log("error when adding a book", err);
    }
  };
}

export function openAddBookModal(open) {
  return (dispatch) => {
    dispatch({ type: "OPEN_ADD_BOOK_MODAL", open });
  };
}
