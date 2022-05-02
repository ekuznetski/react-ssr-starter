import compression from "compression";
import express from "express";
import fs from "fs";
import morgan from "morgan";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

const path = require("path");

const PORT = process.env.PORT || 3001;
const indexFile = "./dist/index.html";
const app = express();
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("dev"));

app.get("/", (req: express.Request, res: express.Response) => {
  const url = "/" + req.url.replace(/^\/?([^\/]*)\/?.*/, "$1");

  // (global as any).window = window;
  // (global as any).document = document;
  // (global as any).location = window.location;

  const app = renderToString(<App />);

  return fs.readFile(indexFile, "utf8", async (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res
        .status(500)
        .send("Oops, can't find html file! Pls run build for client");
    }

    const html = data.replace(
      '<div id="root"></div>',
      `<div id="root">${app}</div>`
    );
    res.contentType("text/html");
    return res.status(200).send(html);
  });
});
app.use(express.static(path.resolve(__dirname, "./")));

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
