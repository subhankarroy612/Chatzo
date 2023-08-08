import * as React from "react";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { Box, Chip, IconButton, Input } from "@mui/joy";
import List from "@mui/joy/List";
import ChatListItem from "./ChatListItem";
import { ChatProps } from "../types";
import SearchIcon from "@mui/icons-material/Search";

type ChatsPaneProps = {
  chats: ChatProps[];
  setSelectedChat: (chat: ChatProps) => void;
  selectedChatId: string;
};

export default function ChatsPane({
  chats,
  setSelectedChat,
  selectedChatId,
}: ChatsPaneProps) {
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
          size="sm"
          startDecorator={<SearchIcon />}
          placeholder="Search"
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
        {chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            {...chat}
            setSelectedChat={setSelectedChat}
            selectedChatId={selectedChatId}
          />
        ))}
      </List>
    </Sheet>
  );
}
