import express from "express";
import * as UserController from "../modules/users/users.controller";

const app = express();

app.post("/signup", UserController.signup);
app.post("/signin", UserController.login);

export default app;
