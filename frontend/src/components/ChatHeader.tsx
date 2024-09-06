import { AiOutlineUser } from "react-icons/ai";

function ChatHeader() {
  return (
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <AiOutlineUser className="user-icon" />
      </div>
      <div className="ml-3">
        <p className="font-medium text-gray-900">Hey👋, Im Ava</p>
        <p className="text-sm text-gray-500">
          Ask me anything or pick a place to start
        </p>
      </div>
    </div>
  );
}

export default ChatHeader;
