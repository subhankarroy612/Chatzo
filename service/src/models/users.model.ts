import { Schema, model } from "mongoose";

const usersSchema = new Schema({
  email: { type: String, required: true },
});

export const UsersModel = model("user", usersSchema);
