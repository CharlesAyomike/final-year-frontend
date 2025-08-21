import { toast } from "react-toastify";
import {
  addChat,
  createConversation,
  getChatHistory,
  getConversations,
  image2text,
  text2Image,
} from "./chatApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateConversationMutation = () => {
  return useMutation({
    mutationFn: createConversation,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      const message =
        error.message || "unable to start new chat, please try again.";

      toast.error(message, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
};

export const useGetConversation = (type) => {
  return useQuery({
    queryKey: ["conversations", type],
    queryFn: () => getConversations(type),
  });
};

export const useGetChatHistory = (id) => {
  return useQuery({
    queryKey: ["conversations", id],
    queryFn: () => getChatHistory(id),
    enabled: !!id,
  });
};

export const useChatMutation = () => {
  return useMutation({
    mutationFn: addChat,

    onError: (error) => {
      const message =
        error.message || "unable to send message, please try again.";

      toast.error(message, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
};

export const useText2Image = () => {
  return useMutation({
    mutationFn: text2Image,

    onError: (error) => {
      console.log(error);
      const message =
        error.message || "unable to send message, please try again.";

      toast.error(message, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
};

export const useImage2text = () => {
  return useMutation({
    mutationFn: image2text,

    onError: (error) => {
      console.log(error);
      const message =
        error.message || "unable to send message, please try again.";

      toast.error(message, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
};
