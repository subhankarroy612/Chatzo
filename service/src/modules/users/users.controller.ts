import { Request, Response } from "express";
import * as UserService from "./users.service";

export const signup = async (req: Request, res: Response) => {
  try {
    await UserService.signup(req.body);
    return res.send({ status: true });
  } catch (err: any) {
    return res.status(400).send({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await UserService.login(req.body);
    return res.send({ token });
  } catch (err: any) {
    return res.status(400).send({ message: err.message });
  }
};
