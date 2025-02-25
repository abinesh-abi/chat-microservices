import { Request, Response, NextFunction } from "express";
import { validateAccessToken } from "../utils";
import { getUserById } from "../services/userService";
import { CustomRequest } from "../types/global";

const validateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  // not have header
  if (!authHeader) {
    res.status(401).json({ message: "Authorization header is missing" });
    return;
  }

  const token = authHeader.split(" ")[1]; // check Bearer token format

  //not have Token
  if (!token) {
    res.status(401).json({ message: "Token is missing" });
    return;
  }

  const validated = validateAccessToken(token);
  if (!validated) {
    res.status(401).json({ message: "Please Provide Valied Token" });
    return;
  }
//   const user = await getUserById(validated._id);

  //passing user to next middle ware
  req.user = validated;
  next();
};

export default validateUser;
