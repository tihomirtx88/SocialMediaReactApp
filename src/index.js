import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DarkModeContextProvider } from "./contex/darkModeContextMode";
import { AuthContextProvider } from "./contex/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DarkModeContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </DarkModeContextProvider>
);
