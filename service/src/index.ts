import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { set } from "mongoose";
import userRoutes from "./routes/users.routes";
import messageRoutes from "./routes/messages.routes";
import contactRoutes from "./routes/contact.routes";
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const onlineUsers = new Set();

io.on("connection", (socket) => {
  socket.on("user_connected", (user) => {
    onlineUsers.add(user.username);
    console.log(onlineUsers);
  });

  socket.on("join_room", (room) => {
    socket.join(room);
  });

  socket.on("new_message", async (body: any) => {
    const channelId = [body.sender, body.receiver].sort().join();
    io.to(channelId).emit("new_message", { body, channelId });
  });

  socket.on("user_disconnected", (user) => {
    onlineUsers.delete(user?.username);
    console.log(onlineUsers);
  });
});

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) =>
  res.send({
    message: "Server is running",
    onlineUsers: Array.from(onlineUsers),
  })
);

app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/contact", contactRoutes);

mongoose.connect(process.env.URL!).then(() =>
  httpServer.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
  })
);
