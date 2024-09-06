import Message from "../interfaces/Message";

function BotMessage(props: { message: Message }) {
  const { message } = props;
  const { text } = message;

  return (
    <div className="flex justify-end">
      <div className="bg-indigo-600 text-white p-3 rounded-l-3xl rounded-br-3xl">
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}

export default BotMessage;
