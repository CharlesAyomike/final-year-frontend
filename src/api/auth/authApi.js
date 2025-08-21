import axiosInstance from "../axiosInstance";

export const createUsers = async (userData) => {
  const response = await axiosInstance.post("/signup", userData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post("/logout");
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axiosInstance.post("/login", userData);
  return response.data;
};
