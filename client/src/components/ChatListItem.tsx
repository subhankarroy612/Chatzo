import * as React from "react";
import Box from "@mui/joy/Box";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import AvatarWithStatus from "./AvatarWithStatus";
import { toggleMessagesPane } from "../utils";

export default function ChatListItem({
  _id,
  username,
  email,
  selectedChatId,
  setSelectedChat,
}: any) {
  const selected = selectedChatId === _id;

  return (
    <React.Fragment>
      <ListItem>
        <ListItemButton
          onClick={() => {
            toggleMessagesPane();
            setSelectedChat({
              _id,
              sender: { _id, username, email },
            });
          }}
          selected={selected}
          color="neutral"
          sx={{
            flexDirection: "column",
            alignItems: "initial",
            gap: 1,
            fontWeight: "normal",
          }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithStatus
              online={true}
              src={"/static/images/avatar/3.jpg"}
            />
            <Box sx={{ flex: 1 }}>
              <Typography fontSize="sm" fontWeight="lg">
                {username}
              </Typography>
              <Typography level="body-sm">{email}</Typography>
            </Box>
            <Box sx={{ lineHeight: 1, textAlign: "right" }}>
              {/* {messages[0].unread && (
                <CircleIcon sx={{ fontSize: 10 }} color="primary" />
              )} */}
              <CircleIcon sx={{ fontSize: 10 }} color="primary" />
            </Box>
          </Stack>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}
