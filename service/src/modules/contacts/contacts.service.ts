import mongoose from "mongoose";
import { ContactModel } from "../../models/contacts.model";
import { UsersModel } from "../../models/users.model";

export const getContacts = async (ownerId: string) => {
  const [contacts] = await ContactModel.aggregate([
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
        contactDetails: {
          $map: {
            input: "$contactDetails",
            as: "contactDetail",
            in: {
              _id: "$$contactDetail._id",
              email: "$$contactDetail.email",
              password: "$$contactDetail.password",
              phone: "$$contactDetail.phone",
              username: "$$contactDetail.username",
              channelId: {
                $arrayElemAt: [
                  "$contacts.channelId",
                  {
                    $indexOfArray: [
                      "$contacts.contactId",
                      "$$contactDetail._id",
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
  ]);

  return contacts;
};

export const addContact = async ({
  owner,
  username,
}: {
  owner: string;
  username: string;
}) => {
  const searchContact: { _id: string } | null = await UsersModel.findOne({
    username,
  });

  if (!searchContact || searchContact._id == owner) {
    throw new Error(`User with username ${username} not found`);
  }

  const contactId: string = searchContact._id;
  const channelId: string = [searchContact._id, owner].sort().join();

  const updateContact = await ContactModel.findOneAndUpdate(
    { owner },
    { $push: { contacts: { contactId, channelId } } },
    { upsert: true, new: true }
  );

  await ContactModel.findOneAndUpdate(
    { owner: contactId },
    { $push: { contacts: { contactId: owner, channelId } } },
    { upsert: true, new: true }
  );

  return updateContact;
};
