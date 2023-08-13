import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    content: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

export const MessageModel = model("message", messageSchema);
