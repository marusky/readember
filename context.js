import React, { useContext, useReducer } from "react";
import { reducer } from "./reducer";

const AppContext = React.createContext();

const defaultState = {
  userID: "",
  update: true,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const signUp = (email, password) => {
    //   todo keby je already registered alebo password less than 6 chars
    dispatch({ type: "SIGN_UP", payload: { email, password } });
  };

  const signIn = (email, password) => {
    dispatch({ type: "SIGN_IN", payload: { email, password } });
  };

  const setUserID = (id) => {
    dispatch({ type: "SET_USER_ID", payload: id });
  };

  const refresh = () => {
    dispatch({ type: "REFRESH" });
  };

  return (
    <AppContext.Provider
      value={{ ...state, signUp, signIn, setUserID, refresh }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
