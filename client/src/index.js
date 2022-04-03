import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UserProvider from "./contexts/UserContext/UserContext";
import PostProvider from "./contexts/PostContext/PostContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
