import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";

const root = document.getElementById("root");
root &&
  hydrateRoot(
    root,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
