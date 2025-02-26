import express from "express";
import CONFIG from "./config/index";

import database from "./database";
import expressApp from "./express-app";

const StartServer = async () => {
  const app = express();

  await database.databaseConnection();

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
