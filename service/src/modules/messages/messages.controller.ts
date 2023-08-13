import { Request, Response } from "express";
import * as MessageService from "./messages.service";

export const sendMessage = async (req: Request, res: Response) => {
  const message = await MessageService.sendMessage(req.body);
  return res.send(message);
};
