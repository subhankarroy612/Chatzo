import express from "express";
import * as MessageController from "../modules/messages/messages.controller";

const app = express();

app.post("/send", MessageController.sendMessage);

export default app;
