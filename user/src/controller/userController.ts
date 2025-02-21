import { NextFunction, Request, Response } from "express";
import {
  generateAccessToken,
  generatePassword,
  generateRefreshToken,
  validatePassword,
} from "../utils";
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "../services/userService";
import { DbUsers, LoginBody, SignupBody } from "../types/user";
import { CustomRequest } from "../types/global";
import { Yup } from "../utils/Yup";

const userCreateSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  username: Yup.string().required(),
  password: Yup.string().required(),
});
const userLoginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

export const signupUser = async (
  req: Request<{}, {}, SignupBody>,
  res: Response,
  next:NextFunction
) => {
  try {
    const body = req.body;
    // validate body
    const validatedData = await userCreateSchema.validate(body, {
      abortEarly: false,
    });
    const { email, password, username } = validatedData;

    // check whether user exist of not
    const isUserExist =
      (await getUserByEmail(email)) || (await getUserByUsername(username));
    if (isUserExist) {
      res.status(400).json({ message: "User Already Exists" });
      return;
    }

    // pass word hashing
    const hashedPasswd = await generatePassword(password);

    const user = await createUser({ email, username, password: hashedPasswd });
    const userObj = { ...user.toObject(), password: undefined };
    const refresh = generateRefreshToken(userObj);
    const access = generateAccessToken(userObj);

    res.json({ refresh, access });
  } catch (error) {
    next(error)
  }
};

export const loginUser = async (
  req: Request<{}, {}, LoginBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    // validate body
    const validatedData = await userLoginSchema.validate(body, {
      abortEarly: false,
    });
    const { password, username } = validatedData;

    const user: DbUsers = await getUserByUsername(username);
    if (!user) {
      res.status(401).json({ message: "Invalid Username or Password" });
      return;
    }

    const validate = await validatePassword(password, user.password);

    if (!validate) {
      res.status(401).json({ message: "Invalid Username or Password" });
      return;
    }

    const userObj = { ...user.toObject(), password: undefined };
    const refresh = generateRefreshToken(userObj);
    const access = generateAccessToken(userObj);

    res.json({ refresh, access });
  } catch (error) {
    next(error);
  }
};

export const userDetails = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (error) {
    next(error);
  }
};
