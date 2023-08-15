import { Request, Response } from "express";
import * as MessageService from "./messages.service";

export const getMessages = async (req: Request, res: Response) => {
  const messages = await MessageService.getMessages(req.body);
  return res.send(messages);
};

export const sendMessage = async (req: Request, res: Response) => {
  const message = await MessageService.sendMessage(req.body);
  return res.send(message);
};
