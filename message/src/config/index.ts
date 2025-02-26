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
  EXCHANGE_NAME: "MS_CHAT_APP", // same in all services
  QUEUE_NAME: "CHAT_QUEUE",
  CHAT_BINDING_KEY: "CHAT_SERVICE",
  USER_BINDING_KEY: "USER_SERVICE",
};

export default CONFIG;
