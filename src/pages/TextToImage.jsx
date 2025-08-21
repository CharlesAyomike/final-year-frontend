import { useState } from "react";
import { Send2 } from "iconsax-reactjs";
import { ToastContainer } from "react-toastify";
import Markdown from "react-markdown";
import { useGetChatHistory, useText2Image } from "../api/chats/useChats";
import { useEffect } from "react";
import { useOutletContext } from "react-router";

export default function TexttoImage() {
  const [messages, setMessages] = useState([]);
  const { consationId } = useOutletContext();
  const { data: chatsHistory, isSuccess: ChatIsSuccess } =
    useGetChatHistory(consationId);
  const { mutate: chatM, isPending: chatIsP } = useText2Image();

  const [input, setInput] = useState("");

  useEffect(() => {
    if (ChatIsSuccess && Array.isArray(chatsHistory?.chats)) {
      setMessages(chatsHistory?.chats);
    }
  }, [ChatIsSuccess, chatsHistory?.chats]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        content: input,
        _id: Date.now() + Math.floor(Math.random() * 100) + 1,
      },
    ]);
    setInput("");
    const chatData = {
      conversationId: consationId,
      content: input.trim(),
    };

    chatM(chatData, {
      onSuccess: (data) => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "assistant",
            content: data?.assistant,
            _id: Date.now() + Math.floor(Math.random() * 100) + 1,
          },
        ]);
      },
    });
  };

  return (
    <>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-6 py-4 sm:py-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400">
            Hello, how can I help you today?
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg._id}>
            {msg.sender === "user" ? (
              <div className="max-w-full my-5 sm:max-w-lg px-4 py-3 rounded-2xl shadow-md shadow-cyan-500/5 break-words bg-cyan-500 text-white self-end ml-auto">
                <Markdown>{msg.content}</Markdown>
              </div>
            ) : (
              <div className="max-w-full my-5 sm:max-w-lg px-4 py-3 rounded-2xl shadow-md shadow-cyan-500/5 break-word bg-gray-800/60 text-gray-200 backdrop-blur-lg border border-gray-700/50">
                <img src={msg.content} className="w-full h-[500px]" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-gray-800/60 backdrop-blur-lg p-2 sm:p-4 flex items-center gap-2 sm:gap-3 shadow-lg shadow-cyan-500/10 border-t border-gray-700/50">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-300 placeholder-gray-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          disabled={chatIsP}
          onClick={sendMessage}
          className="bg-cyan-500 hover:bg-cyan-600 transition p-2 sm:p-3 rounded-lg shadow-lg shadow-cyan-500/20"
        >
          <Send2 size="18" color="#fff" className="sm:w-5 sm:h-5" />
        </button>
      </div>

      <ToastContainer />
    </>
  );
}
