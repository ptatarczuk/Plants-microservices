import { useEffect, useRef } from "react";
import { Message } from "../../model/socket/Message";
import MessageItem from "../message_item/MessageItem";
import { MessagesContainer } from "./MessageList.styles";

interface MessageListProps {
  messageList: Message[];
}

export default function MessageList({ messageList }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <MessagesContainer>
      {messageList.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </MessagesContainer>
  );
}
