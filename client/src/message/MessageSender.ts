import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ACCESS_TOKEN } from "../constants/constants";

export const sendMessageToChosenRoom = (
  room: string,
  username: string,
  email: string,
  imageUrl: string,
  message: string
) => {
  const client = Stomp.over(
    () =>
      new SockJS(`${import.meta.env.VITE_API_URL}/stomp`, {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      })
  );
  client.debug = function () {};
  client.connect(
    { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` },
    () => {
      client.send(
        `/app/messages/${room}`,
        {},
        JSON.stringify({ room, username, email, imageUrl, message })
      );
      client.disconnect(() => {});
    }
  );
};
