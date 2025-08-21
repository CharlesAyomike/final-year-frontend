import {
  Message,
  Menu,
  User,
  Setting2,
  UserSquare,
  Logout,
  CloseCircle,
} from "iconsax-reactjs";
import { useEffect, useState } from "react";
import { useLogoutMutation } from "../api/auth/useAuth";
import { ToastContainer } from "react-toastify";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  useCreateConversationMutation,
  useGetConversation,
} from "../api/chats/useChats";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [seletedModel, setSeletedModel] = useState();
  const [consationId, setConversationId] = useState();
  const [currentChats, setCurrentChat] = useState("chatCompletion");
  const { data, isSuccess } = useGetConversation(currentChats);
  const { mutate: newConvo, isPending: newConvoPending } =
    useCreateConversationMutation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/chat/image-to-text") {
      setCurrentChat("Image2Text");
    }
    if (location.pathname === "/chat") {
      setCurrentChat("chatCompletion");
    }
    if (location.pathname === "/chat/text-to-image") {
      setCurrentChat("text2Image");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isSuccess && Array.isArray(data?.conversations)) {
      setConversationId(data?.conversations[0]._id);
    }
  }, [data, isSuccess]);
  const { mutate, isPending } = useLogoutMutation();
  const handleLogout = () => {
    mutate();
  };
  const handleLink = (to, screen) => {
    setCurrentChat(screen);
    navigate(`${to}`);
  };

  const startNewConvo = () => {
    const obj = {
      type: currentChats,
    };

    newConvo(obj, {
      onSuccess: (data) => {
        setConversationId(data.conversationId);
      },
    });
  };

  return (
    <div className="relative flex h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/50 via-gray-900 to-gray-900 z-0"></div>
      <div className="hidden sm:block absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>

      {/* Sidebar desktop */}
      <div className="w-56 hidden sm:flex bg-gray-800/60 backdrop-blur-lg rounded-r-2xl shadow-2xl shadow-cyan-500/10 px-2 py-3 flex-col transition-all duration-300 z-10 border-r border-gray-700/50">
        <div className="flex flex-col mt-8 gap-2">
          <button
            disabled={newConvoPending}
            onClick={() => startNewConvo()}
            className="flex items-center gap-3 p-2 hover:bg-gray-700/50 rounded-xl transition"
          >
            <Message size="22" color="#22d3ee" />
            <span className="text-gray-200">new conversation</span>
          </button>

          <div className="border-b border-b-cyan-800 w-full my-3" />

          <button
            onClick={() => handleLink("/", "chatCompletion")}
            className="flex items-center gap-3 p-2 hover:bg-gray-700/50 rounded-xl transition"
          >
            <Message size="22" color="#22d3ee" />
            <span className="text-gray-200">Chats</span>
          </button>
          <button
            onClick={() => handleLink("text-to-image", "text2Image")}
            className="flex items-center gap-3 p-2 hover:bg-gray-700/50 rounded-xl transition"
          >
            <User size="22" color="#22d3ee" />
            <span className="text-gray-200">Text to Image</span>
          </button>
          <button
            onClick={() => handleLink("image-to-text", "Image2Text")}
            className="flex items-center gap-3 p-2 hover:bg-gray-700/50 rounded-xl transition"
          >
            <Setting2 size="22" color="#22d3ee" />
            <span className="text-gray-200">Image to text</span>
          </button>
          <div className="border-b border-b-cyan-800 w-full my-3" />
          <h4 className="text-center font-medium mb-3">
            Conversation history for{" "}
            {currentChats === "chatCompletion"
              ? "chats"
              : currentChats === "text2Image"
              ? "text to image"
              : "image to text"}
          </h4>
          {data?.conversations.map((item, i) => (
            <button
              className="cursor-pointer hover:underline hover:text-blue-500"
              onClick={() => setConversationId(item._id)}
              key={item._id}
            >
              conversation {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar mobile */}
      <div
        className={`${
          sidebarOpen ? "absolute z-30 overflow-scroll h-full" : "hidden"
        } sm:hidden overflow-hidden bg-gray-800/60 backdrop-blur-lg rounded-r-2xl shadow-2xl shadow-cyan-500/10 px-2 py-3 flex-col transition-all duration-300 z-10 border-r border-gray-700/50`}
      >
        <div className="flex flex-col gap-2">
          <button
            disabled={newConvoPending}
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 p-2 hover:bg-gray-700/50 rounded-xl transition"
          >
            <CloseCircle size="22" color="#22d3ee" />
          </button>
          <button
            disabled={newConvoPending}
            onClick={() => {
              startNewConvo();
              setSidebarOpen(false);
            }}
            className="flex items-center gap-3 p-2 hover:bg-gray-700/50 rounded-xl transition"
          >
            <Message size="22" color="#22d3ee" />
            <span className="text-gray-200">new conversation</span>
          </button>

          <div className="border-b border-b-cyan-800 w-full my-3" />

          <button
            onClick={() => {
              handleLink("/", "chatCompletion");
              setSidebarOpen(false);
            }}
            className="flex items-center gap-3 p-2 hover:bg-gray-700/50 rounded-xl transition"
          >
            <Message size="22" color="#22d3ee" />
            <span className="text-gray-200">Chats</span>
          </button>
          <button
            onClick={() => {
              handleLink("text-to-image", "text2Image");
              setSidebarOpen(false);
            }}
            className="flex items-center gap-3 p-2 hover:bg-gray-700/50 rounded-xl transition"
          >
            <User size="22" color="#22d3ee" />
            <span className="text-gray-200">Text to Image</span>
          </button>
          <button
            onClick={() => {
              handleLink("image-to-text", "Image2Text");
              setSidebarOpen(false);
            }}
            className="flex items-center gap-3 p-2 hover:bg-gray-700/50 rounded-xl transition"
          >
            <Setting2 size="22" color="#22d3ee" />
            <span className="text-gray-200">Image to text</span>
          </button>
          <div className="border-b border-b-cyan-800 w-full my-3" />
          <h4 className="text-center font-medium mb-3">
            Conversation history for{" "}
            {currentChats === "chatCompletion"
              ? "chats"
              : currentChats === "text2Image"
              ? "text to image"
              : "image to text"}
          </h4>
          {data?.conversations.map((item, i) => (
            <button
              className="cursor-pointer hover:underline hover:text-blue-500"
              onClick={() => {
                setConversationId(item._id);
                setSidebarOpen(false);
              }}
              key={item._id}
            >
              conversation {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col flex-1 relative z-10">
        {/* Chat Header */}
        <div className="bg-gray-800/60 backdrop-blur-lg px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center shadow-lg shadow-cyan-500/10 border-b border-gray-700/50">
          <div className="flex items-center">
            <button
              className="p-3 hover:bg-gray-700/50 rounded-xl transition sm:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size="24" color="#22d3ee" />
            </button>

            <h1 className="text-base sm:text-lg font-semibold tracking-wide text-white">
              AI Assistant
            </h1>
          </div>
          <div>
            <button onClick={() => setSeletedModel(!seletedModel)}>
              <UserSquare />
            </button>
          </div>

          <div
            className={`${
              seletedModel ? "" : "hidden"
            } absolute top-16 sm:top-12 right-4 p-4 rounded bg-gray-900`}
          >
            <div className="pb-1">
              <button
                disabled={isPending}
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 hover:bg-gray-700/50 transition"
              >
                <Logout size="20" color="#22d3ee" />
                <span className="text-gray-200">Logout</span>
              </button>
            </div>
          </div>
        </div>

        <Outlet context={{ consationId, setConversationId }} />
      </div>

      <ToastContainer />
    </div>
  );
}

export default Layout;
