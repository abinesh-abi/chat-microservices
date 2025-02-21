// import dotEnv from "dotenv";
// if (process.env.NODE_ENV !== "prod") {
//   const configFile = `./.env.${process.env.NODE_ENV}`;
//   dotEnv.config({ path: configFile });
// } else {
//   dotEnv.config();
// }

const CONFIG = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET || "secret",
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL || "amqp://localhost",
  EXCHANGE_NAME: "MS_CHAT_APP",
  USER_BINDING_KEY: "USER_SERVICE",
  QUEUE_NAME: "USER_QUEUE",
};

export default CONFIG;
