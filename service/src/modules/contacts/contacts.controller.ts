import { Request, Response } from "express";
import * as ContactService from "./contacts.service";

export const getContacts = async (req: Request, res: Response) => {
  const { id } = req.params;
  const contacts = await ContactService.getContacts(id);
  return res.send({ data: contacts });
};

export const addContact = async (req: Request, res: Response) => {
  try {
    const contact = await ContactService.addContact(req.body);
    return res.send({ status: true, data: contact });
  } catch (err: any) {
    return res.send({ message: err.message });
  }
};
