// src/websocketServer.ts
import WebSocket from "ws";
// import { MessageType } from "./types/chat";
import CONFIG from "./config";
import { Message } from "./types/global";

const wss = new WebSocket.Server({ port: CONFIG.PORT });

const users = new Map<string, WebSocket>();

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (buffer) => {
    try {
      const parsedMessage = JSON.parse(buffer.toString()); // handling parse error in catch block

      if (!parsedMessage.type)
        return ws.send('Provide Json data with "type" key');


      //   Handle user registration
      if (parsedMessage.type === "register") {
        const { userId } = parsedMessage;
        users.set(userId, ws);
        console.log(`User registered: ${userId}`);
      }

      // Handle sending a message to a specific user
      if (parsedMessage.type === "private_message") {
        const message: Message | undefined = parsedMessage?.message;
        const receiver: string = parsedMessage?.receiver;
        if (message?._id && receiver) {
          const recipientWs = users.get(receiver);
          if (recipientWs) {
            recipientWs.send(JSON.stringify({ message }));
          } else {
            console.log(`User ${message.sender} not found`);
          }
        } else {
          console.log("issue in data");
        }
      }
    } catch (error) {
      if (error as JSON["parse"]) {
        ws.send('Provide Json data with "type" key');
      }
    }
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log(`WebSocket server is running on ws://localhost:${CONFIG.PORT}`);
