import express from "express";
import cors from "cors";
import path from "path";
import userRoute from "./routes/userRoutes";
// import { customer, appEvent } from "./api.js";
import HandleErrors from "./utils/error-handler.js";

export default (app: express.Express) => {
  // app.use(express.json({ limit: "0mb" }));
  // app.use(express.urlencoded({ extended: true, limit: "0mb" }));
  app.use(cors({
    origin:'*'
  }));
  app.use(express.static(path.dirname + "/public"));
  app.use(express.json());


  app.use('/',userRoute)

  // //Listen to Event
  // appEvent(app)


  // error handling
    app.use(HandleErrors);
};
