import React from "react";
import { AppProvider } from "./context";
import Root from "./components/Root";

export default function App() {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  );
}
