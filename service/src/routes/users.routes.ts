import express from "express";
import { UsersModel } from "../models/users.model";

const app = express();

app.post("/signup", async (req, res) => {
  try {
    const { email } = req.body;
    const user = new UsersModel({ email });
    await user.save();
    return res.send(user);
  } catch (err) {
    console.log(err);
  }
});

export default app;
