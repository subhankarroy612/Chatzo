import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/users.routes";
import messageRoutes from "./routes/messages.routes";
import contactRoutes from "./routes/contact.routes";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => res.send("Server is running"));

app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/contact", contactRoutes);

mongoose.connect(process.env.URL!).then(() =>
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
  })
);
