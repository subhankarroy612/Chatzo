import express from "express";
import * as ContactController from "../modules/contacts/contacts.controller";

const app = express();

app.post("/add", ContactController.addContact);
app.get("/:id", ContactController.getContacts);

export default app;
