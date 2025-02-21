import { Request, Response, Router } from "express";
import { CreateChannel } from "../utils";
import { Channel } from "amqplib";
import { subscribeEvents } from "../services/userService";
import { loginUser, signupUser, userDetails } from "../controller/userController";
import validateUser from "../middlewares/validateUser";

const router = Router();

let channel: Channel;

// Connect to RabbitMQ
async function connectToRabbitMQ() {
  channel = await CreateChannel();
}
connectToRabbitMQ();

/* handle events */
router.use("/app-events", (req, res) => {
  const { payload } = req.body;
  subscribeEvents(payload);
  console.log("----------User Event Triggered-------------");
  res.status(200).json(payload);
  return;
});

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/user-details",validateUser,userDetails);
// router.post("/access-token", getAccessToken);

export default router;
