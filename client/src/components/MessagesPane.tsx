import * as React from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import AvatarWithStatus from "./AvatarWithStatus";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import MessagesPaneHeader from "./MessagesPaneHeader";
import { ChatProps, MessageProps } from "../types";
import jwtDecode from "jwt-decode";
import { socket } from "../Message";

export default function MessagesPane({ chat }: any) {
  const [chatMessages, setChatMessages] = React.useState(chat.messages);
  const [textAreaValue, setTextAreaValue] = React.useState("");
  const [token, setToken] = React.useState(localStorage.getItem("chatzo"));
  const [userDetails, setUserDetails] = React.useState<any>({});
  const [messages, setMessages] = React.useState<any>([]);

  React.useEffect(() => {
    if (token) {
      const details: any = jwtDecode(token);
      setUserDetails(details);
    }
  }, [token]);

  React.useEffect(() => {
    getMessages();
  }, [chat]);

  React.useEffect(() => {
    socket.on("new_message", (newMessage) => {
      console.log(newMessage);
    });

    return () => {
      socket.off("new_message");
    };
  }, []);

  const getMessages = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/message/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: userDetails.id,
          receiver: chat.sender._id,
        }),
      });
      const res = await response.json();
      setMessages(res);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/message/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: userDetails.id,
          receiver: chat.sender._id,
          content: textAreaValue,
        }),
      });
      const res = await response.json();
      if (res) {
        setMessages([...messages, res]);
        socket.emit("new_message", res);
      }
      setTextAreaValue("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Sheet
      sx={{
        height: { xs: "calc(100dvh - var(--Header-height))", lg: "100dvh" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MessagesPaneHeader sender={chat.sender} />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 2.5,
          overflowY: "scroll",
          flexDirection: "column-reverse",
        }}
      >
        <Stack spacing={2} justifyContent="flex-end">
          {messages &&
            messages.map((message: any, index: number) => {
              const isYou = message.sender === userDetails.id;
              return (
                <Stack
                  key={index}
                  direction="row"
                  spacing={2}
                  flexDirection={isYou ? "row-reverse" : "row"}
                >
                  {message.sender !== userDetails.id && (
                    <AvatarWithStatus
                      online={message.sender.online}
                      src={message.sender.avatar}
                    />
                  )}
                  <ChatBubble
                    variant={isYou ? "sent" : "received"}
                    userDetails={userDetails}
                    chat={chat}
                    {...message}
                  />
                </Stack>
              );
            })}
        </Stack>
      </Box>

      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={sendMessage}
      />
    </Sheet>
  );
}
