import React, { useContext, useReducer } from "react";
import { reducer } from "./reducer";

const AppContext = React.createContext();

const defaultState = {
  userID: "",
  update: true,
  navigation: null,
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

  const setNavigation = (navigation) => {
    dispatch({ type: "SET_NAVIGATION", payload: navigation });
  };

  const setReadingTimeState = (readingTime, bookID) => {
    dispatch({ type: "SET_READING_TIME", payload: { readingTime, bookID } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        setUserID,
        refresh,
        setNavigation,
        setReadingTimeState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
