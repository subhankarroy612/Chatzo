import * as React from "react";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { Box, Chip, Input } from "@mui/joy";
import List from "@mui/joy/List";
import ChatListItem from "./ChatListItem";
import SearchIcon from "@mui/icons-material/Search";
import jwtDecode from "jwt-decode";
import { socket } from "../Message";

export default function ChatsPane({ setSelectedChat, selectedChatId }: any) {
  const [text, setText] = React.useState("");
  const [token, setToken] = React.useState(localStorage.getItem("chatzo"));
  const [userDetails, setUserDetails] = React.useState<any>({});
  const [contacts, setContacts] = React.useState([]);

  React.useEffect(() => {
    if (token) {
      const details: any = jwtDecode(token);
      setUserDetails(details);
      getContacts(details.id);
    }
  }, [token]);

  const getContacts = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/contact/${id}`);
      const {
        data: { contactDetails },
      } = await response.json();
      setContacts(contactDetails);
      setSelectedChat({
        _id: contactDetails[0]._id,
        sender: {
          _id: contactDetails[0]._id,
          username: contactDetails[0].username,
          email: contactDetails[0].email,
        },
        channelId: contactDetails[0].channelId,
      });
      socket.emit("join_room", contactDetails[0].channelId);
    } catch (error) {
      console.log(error);
    }
  };

  const addContact = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        let res: any = await fetch("http://localhost:8080/api/contact/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            owner: userDetails.id,
            username: text,
          }),
        });
        res = await res.json();
        setText("");
        if (res.status) {
          alert("Contact added successfully");
          getContacts(userDetails.id);
        } else {
          alert(res.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Sheet
      sx={{
        borderRight: "1px solid",
        borderColor: "divider",
        height: "calc(100dvh - var(--Header-height))",
        overflowY: "auto",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" p={2} pb={1.5}>
        <Typography
          fontSize={{ xs: "md", md: "lg" }}
          component="h1"
          fontWeight="lg"
          endDecorator={
            <Chip
              variant="outlined"
              color="neutral"
              size="sm"
              slotProps={{ root: { component: "span" } }}
            >
              40
            </Chip>
          }
          sx={{ mr: "auto" }}
        >
          Messages
        </Typography>
      </Stack>

      <Box px={2} pb={1.5}>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={addContact}
          size="sm"
          startDecorator={<SearchIcon />}
          placeholder="Username"
          aria-label="Search"
        />
      </Box>
      <List
        sx={{
          py: 0,
          "--ListItem-paddingY": "0.75rem",
          "--ListItem-paddingX": "1rem",
        }}
      >
        {contacts &&
          contacts.map((contact: any) => (
            <ChatListItem
              key={contact._id}
              {...contact}
              setSelectedChat={setSelectedChat}
              selectedChatId={selectedChatId}
            />
          ))}
      </List>
    </Sheet>
  );
}
