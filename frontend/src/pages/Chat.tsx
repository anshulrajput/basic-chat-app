/* eslint-disable no-console */
import "./Chat.css";

import { useEffect, useRef, useState } from "react";

import BotMessage from "../components/BotMessage";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import UserMessage from "../components/UserMessage";
import Message from "../interfaces/Message";
import apiClient from "../service/AxiosService";

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatWindowRef.current)
      chatWindowRef.current.scrollTop = chatWindowRef.current?.scrollHeight;
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await apiClient.get<Message[]>(`/messages/`);

        console.log(response);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const sendMessageHandler = async (text: string) => {
    try {
      const response = await apiClient.post<Message[]>(`/messages/`, {
        text
      });
      setMessages([...messages, ...response.data]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    scrollToBottom();
  };

  const deleteMessageHandler = async (id: string) => {
    try {
      await apiClient.delete<Message>(`/messages/${id}`);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const editMessageHandler = async (id: string, text: string) => {
    try {
      await apiClient.put<Message>(`/messages/${id}`, {
        text
      });

      setMessages((prev) => {
        const updatedMessageList: Message[] = [];
        prev.forEach((msg: Message) => {
          if (msg.id === id) {
            // eslint-disable-next-line no-param-reassign
            msg.text = text;
          }

          updatedMessageList.push(msg);
        });

        return updatedMessageList;
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto my-auto bg-white border border-gray-300 rounded-lg shadow-md chat-widget">
      <div className="flex flex-col p-4">
        {/* Header */}
        <ChatHeader />

        {/* Chat Messages */}
        <div
          className="flex flex-col space-y-4 message-container"
          ref={chatWindowRef}
        >
          {messages.length > 0 &&
            messages.map((message: Message) => {
              if (message.sender === "user") {
                return (
                  <UserMessage
                    key={message.id}
                    message={message}
                    onDelete={deleteMessageHandler}
                    onEdit={editMessageHandler}
                  />
                );
              }
              if (message.sender === "bot") {
                return <BotMessage key={message.id} message={message} />;
              }
              return null;
            })}
        </div>

        {/* Action buttons */}
        <ChatInput sendClick={sendMessageHandler} />
      </div>
    </div>
  );
}

export default Chat;
