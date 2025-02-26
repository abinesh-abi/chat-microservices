import express from "express";
import cors from "cors";
import path from "path";
import messageRoute from "./routes/messageRoutes";
import HandleErrors from "./utils/error-handler.js";

export default (app: express.Express) => {
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(express.static(path.dirname + "/public"));
  app.use(express.json());

  app.use("/", messageRoute);

  // error handling
  app.use(HandleErrors);
};
