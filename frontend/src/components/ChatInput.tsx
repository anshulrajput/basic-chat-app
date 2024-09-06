import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

// eslint-disable-next-line no-unused-vars
function ChatInput(props: { sendClick: (text: string) => void }) {
  const { sendClick } = props;

  const [input, setInput] = useState<string>("");

  const sendMessageHandler = (text: string) => {
    sendClick(text);
    setInput("");
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessageHandler(input);
        }}
        placeholder="Type your message..."
      />
      <AiOutlineSend
        className="send-icon cursor-pointer"
        onClick={() => sendMessageHandler(input)}
      />
    </div>
  );
}

export default ChatInput;
