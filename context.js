import React, { useContext, useReducer } from "react";
import { reducer } from "./reducer";

const AppContext = React.createContext();

const defaultState = {
  name: "defa",
  user: null,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const changeName = (name) => {
    dispatch({ type: "SET_PETER", payload: name });
  };

  const signUp = (email, password) => {
    //   todo keby je already registered alebo password less than 6 chars
    dispatch({ type: "SIGN_UP", payload: { email, password } });
  };

  return (
    <AppContext.Provider value={{ ...state, changeName, signUp }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
