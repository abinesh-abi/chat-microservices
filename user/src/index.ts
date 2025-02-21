import express from "express";
import CONFIG from "./config/index";

import { CreateChannel } from "./utils";
import database from "./database";
import expressApp from "./express-app";

const StartServer = async () => {
  const app = express();

  await database.databaseConnection();

  const channel = await CreateChannel();

  expressApp(app);

  app
    .listen(CONFIG.PORT, () => {
      console.log(`listening to port ${CONFIG.PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
