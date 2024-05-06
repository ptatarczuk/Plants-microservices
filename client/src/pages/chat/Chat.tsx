import { Paper, Stack, Typography } from "@mui/material";
import {
  ChatChannel,
  ChatContainer,
  ChatInfoDetails,
  ChatMainContainerStyle,
} from "./Chat.styles";
import { COLOR_1, COLOR_3 } from "../../constants/constants";
import { useState } from "react";

import ChatWindow from "../../components/chat_window/ChatWindow";

const channels: string[] = [
  "Plant Care",
  "Exotic Plants",
  "Plant Exchange",
  "Diseases",
];

export default function Chat() {
  const [chosenChannel, setChosenChannel] = useState<string>("");

  return (
    <ChatMainContainerStyle>
      <ChatWindow chosenChannel={chosenChannel} />
      <Paper
        sx={{
          backgroundColor: COLOR_3,
          width: "250px",
          height: "90vh",
          minHeight: "500px",
          borderRadius: "10px",
        }}
      >
        <ChatContainer>
          <Typography variant="h4">Channels</Typography>
          <ChatInfoDetails>
            <Stack
              direction="column"
              spacing={3}
              mt={4}
              width="85%"
              alignItems="center"
            >
              {channels.map((channel, index) => (
                <ChatChannel
                  key={index}
                  style={{
                    backgroundColor:
                      channel === chosenChannel ? COLOR_3 : COLOR_1,
                  }}
                >
                  <Typography
                    onClick={() => {
                      setChosenChannel(channel);
                      // getMessages(channel);
                    }}
                  >
                    {channel}
                  </Typography>
                </ChatChannel>
              ))}
            </Stack>
          </ChatInfoDetails>
        </ChatContainer>
      </Paper>
    </ChatMainContainerStyle>
  );
}
