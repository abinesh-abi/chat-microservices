import { Router } from "express";
import { CreateChannel, SubscribeMessage } from "../utils";
import {
  loginUser,
  signupUser,
  userDetails,
} from "../controller/userController";
import validateUser from "../middlewares/validateUser";

const router = Router();

export const channel = // Connect to RabbitMQ
  (async function connectToRabbitMQ() {
    const channel = await CreateChannel();
    SubscribeMessage(channel);
    return channel;
  })();


router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/user-details", validateUser, userDetails);
// router.post("/access-token", getAccessToken);

export default router;
