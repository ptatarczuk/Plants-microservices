import { Avatar, Box, Stack, Typography } from "@mui/material";
import { Message } from "../../model/socket/Message";

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const date: Date = new Date(message.createdDateTime);

  return (
    <Stack direction="row" spacing={2} width="100%">
      <Avatar src={message.imageUrl} sx={{ width: 40, height: 40 }} />
      <Box sx={{ width: "80%" }}>
        <Stack direction="row" spacing={1} alignItems="baseline">
          <Typography variant="h6">{message.username}</Typography>
          <Typography variant="body2" sx={{ color: "grey" }}>
            {date.toLocaleString().slice(0, -3).replace(",", "")}
          </Typography>
        </Stack>
        <Typography sx={{ width: "100%", overflowWrap: "break-word" }}>
          {message.message}
        </Typography>
      </Box>
    </Stack>
  );
}
