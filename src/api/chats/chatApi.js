import axiosInstance from "../axiosInstance";

export const createConversation = async (typeData) => {
  const response = await axiosInstance.post("/create-conversation", typeData);
  return response.data;
};

export const getConversations = async (type) => {
  const response = await axiosInstance.get(`/get-conversations/${type}`);
  return response.data;
};

export const addChat = async (chatData) => {
  const response = await axiosInstance.post("/add-chat", chatData);
  return response.data;
};

export const getChatHistory = async (id) => {
  const response = await axiosInstance.get(`/get-chat-conversations/${id}`);
  return response.data;
};
export const text2Image = async (chatData) => {
  const response = await axiosInstance.post("/texttoimage", chatData);
  return response.data;
};

export const image2text = async (chatData) => {
  const response = await axiosInstance.post("/imagetotext", chatData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
