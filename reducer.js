import { auth } from "./config";

const addUser = async (email, password) => {
  console.log("peter");
};

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
          console.log(user);
          return { ...prevState, user };
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
  }
  throw new Error("no mathing action type");
};

export { reducer };
