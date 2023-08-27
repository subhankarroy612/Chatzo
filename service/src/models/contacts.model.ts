import { Schema, model } from "mongoose";

const contactSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, required: true },
    contacts: [
      {
        contactId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        channelId: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

export const ContactModel = model("contact", contactSchema);
