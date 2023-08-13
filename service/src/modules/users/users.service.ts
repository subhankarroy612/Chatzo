import { UsersModel } from "../../models/users.model";
import jwt from "jsonwebtoken";

const generateToken = (body: { email: string; username: string }) => {
  return jwt.sign(body, process.env.JWT_SECRET as string);
};

export const signup = async (body: {
  email: string;
  username: string;
  phone: string;
  password: string;
}) => {
  const { email, username, phone, password } = body;

  const checkUser = await UsersModel.findOne({ username });
  if (checkUser) {
    throw new Error("Username is already in use");
  }

  const checkEmail = await UsersModel.findOne({ email });
  if (checkEmail) {
    throw new Error("Email is already in use");
  }

  const user = (
    await UsersModel.create({ email, username, phone, password })
  ).save();

  return user;
};

export const login = async (body: { email: string; password: string }) => {
  const { email, password } = body;

  const user = await UsersModel.findOne({ email, password });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({ email: user.email, username: user.username });
  return token;
};
