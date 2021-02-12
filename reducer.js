import { auth } from "./config";

const reducer = (prevState, action) => {
  switch (action.type) {
    case "SET_PETER": {
      return {
        ...prevState,
        name: action.payload,
      };
    }
    case "SIGN_UP": {
      const { email, password } = action.payload;
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;

          return { ...prevState, user, userSignedIn: true, loading: false };
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("ERROR");
          console.log(errorCode, errorMessage);
        });
      return {
        ...prevState,
        loading: true,
      };
    }
    case "SIGN_IN": {
      const { email, password } = action.payload;
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("ERROR");
          console.log(errorCode, errorMessage);
        });
      return {
        ...prevState,
      };
    }
    case "SET_USER_ID": {
      const userID = action.payload;
      return { ...prevState, userID };
    }
    case "REFRESH":
      return { ...prevState, update: !prevState.update };
    case "SET_NAVIGATION":
      return { ...prevState, navigation: action.payload };
    case "SET_READING_TIME": {
      console.log(prevState, action.payload);
      return { ...prevState };
    }
  }

  throw new Error("no mathing action type");
};

export { reducer };
