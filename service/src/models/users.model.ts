import { Schema, model } from "mongoose";

const usersSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  username: { type: String, required: true },
});

export const UsersModel = model("user", usersSchema);
