import { useRef, useState } from "react";
import { AttachSquare, Send2 } from "iconsax-reactjs";
import { ToastContainer } from "react-toastify";
import Markdown from "react-markdown";
import { useGetChatHistory, useImage2text } from "../api/chats/useChats";
import { useEffect } from "react";
import { useOutletContext } from "react-router";

const toFormData = (data) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  return formData;
};

const getImageSrc = (picture) => {
  if (!picture) return "";
  if (typeof picture === "string") {
    // already an http/https url
    return picture;
  }
  // otherwise it's a File object
  return URL.createObjectURL(picture);
};

export default function ImageToText() {
  const [messages, setMessages] = useState([]);
  const { consationId } = useOutletContext();
  const [picture, setPicture] = useState();
  const { data: chatsHistory, isSuccess: ChatIsSuccess } =
    useGetChatHistory(consationId);
  const { mutate: chatM, isPending: chatIsP } = useImage2text();
  const imagePickerRef = useRef();
  const [input, setInput] = useState("");

  useEffect(() => {
    if (ChatIsSuccess && Array.isArray(chatsHistory?.chats)) {
      setMessages(chatsHistory?.chats);
    }
  }, [ChatIsSuccess, chatsHistory?.chats]);

  const triggerImagePicker = () => {
    imagePickerRef.current.click();
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        content: input,
        image: picture,
        _id: Date.now() + Math.floor(Math.random() * 100) + 1,
      },
    ]);

    const chatData = {
      conversationId: consationId,
      content: input.trim(),
      image: picture,
    };

    const formData = toFormData(chatData);
    chatM(formData, {
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
      onSettled: () => {
        setInput("");
        setPicture();
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
        {messages.map((msg) => {
          return (
            <div key={msg._id}>
              {msg.sender === "user" ? (
                <div className="max-w-full my-5 sm:max-w-lg px-4 py-3 rounded-2xl shadow-md shadow-cyan-500/5 break-words bg-cyan-500 text-white self-end ml-auto">
                  <Markdown>{msg.content}</Markdown>
                  <img
                    src={getImageSrc(msg.image)}
                    className="w-full h-[500px]"
                  />
                </div>
              ) : (
                <div className="max-w-full my-5 sm:max-w-lg px-4 py-3 rounded-2xl shadow-md shadow-cyan-500/5 break-word bg-gray-800/60 text-gray-200 backdrop-blur-lg border border-gray-700/50">
                  <Markdown>{msg.content}</Markdown>
                </div>
              )}
            </div>
          );
        })}
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

        {picture && <img src={getImageSrc(picture)} className="w-13 h-13" />}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={imagePickerRef}
          onChange={(e) => handleFile(e)}
        />

        <button disabled={chatIsP} onClick={() => triggerImagePicker()}>
          <AttachSquare className="w-13 h-13" />
        </button>
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
