// database related modules
import databaseConnection from "./connection";
import UserRepository from "./repository/user-repository";

const database = {
  databaseConnection,
  UserRepository,
};

export default database;
