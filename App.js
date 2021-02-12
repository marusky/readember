import React from "react";
import { AppProvider } from "./context";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import Root from "./components/Root";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <AppProvider>
      <Provider store={store}>
        <Root />
      </Provider>
    </AppProvider>
  );
}
