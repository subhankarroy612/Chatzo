import { MessageModel } from "../../models/messages.model";

export const getMessages = async (body: {
  sender: string;
  receiver: string;
}) => {
  const messages = await MessageModel.find({
    $or: [
      { sender: body.sender, receiver: body.receiver },
      { sender: body.receiver, receiver: body.sender },
    ],
  }).sort({ createdAt: 1 });
  return messages;
};

export const sendMessage = async (body: {
  sender: string;
  receiver: string;
  content: string;
}) => {
  const newMessage = await MessageModel.create({ ...body });
  await newMessage.save();
  return newMessage;
};
