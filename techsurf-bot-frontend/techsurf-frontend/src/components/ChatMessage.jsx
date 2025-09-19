
function ChatMessage({ role, content }) {
  return (
    <div
      className={`p-3 rounded-xl max-w-[75%] break-words ${
        role === "user"
          ? "bg-blue-500 text-white self-end ml-auto text-right"
          : "bg-gray-300 text-black self-start mr-auto text-left"
      }`}
    >
      {content}
    </div>
  );
}

export default ChatMessage;
