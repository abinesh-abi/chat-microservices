import express from "express";
import cors from "cors";
import path from "path";
import chatRoute from "./routes/chatRoutes";
import HandleErrors from "./utils/error-handler.js";

export default (app: express.Express) => {
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(express.static(path.dirname + "/public"));
  app.use(express.json());

  app.use("/", chatRoute);

  // error handling
  app.use(HandleErrors);
};
