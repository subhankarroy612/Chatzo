import { MessageModel } from "../../models/messages.model";

export const sendMessage = async (body: {
  sender: string;
  content: string;
}) => {
  const newMessage = await MessageModel.create({ ...body });
  await newMessage.save();
  return newMessage;
};
