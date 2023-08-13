import mongoose from "mongoose";
import { ContactModel } from "../../models/contacts.model";

export const getContacts = async (ownerId: string) => {
  const contacts = await ContactModel.aggregate([
    {
      $match: { owner: new mongoose.Types.ObjectId(ownerId) },
    },
    {
      $lookup: {
        from: "users",
        localField: "contacts.contactId",
        foreignField: "_id",
        as: "contactDetails",
      },
    },
    {
      $project: {
        owner: 1,
        contactDetails: 1,
      },
    },
  ]);

  return contacts;
};

export const addContact = async ({
  owner,
  contactId,
}: {
  owner: string;
  contactId: string;
}) => {
  const updateContact = await ContactModel.findOneAndUpdate(
    { owner },
    { $push: { contacts: { contactId } } },
    { upsert: true, new: true }
  );

  await ContactModel.findOneAndUpdate(
    { owner: contactId },
    { $push: { contacts: { contactId: owner } } },
    { upsert: true, new: true }
  );

  return updateContact;
};
