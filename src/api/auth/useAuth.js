import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createUsers, loginUser, logoutUser } from "./authApi";
import { useDispatch } from "react-redux";
import { login, logout } from "../../redux/authSlice";

export const useCreateUserMutation = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: createUsers,
    onSuccess: (data) => {
      dispatch(login(data));

      toast.success("Congratulation, you have created an account", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error) => {
      const message =
        error.message || "unable to create user, please try again.";

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

export const useLogoutMutation = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      dispatch(logout());

      toast.success("Hope to see you soon", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error) => {
      const message = error.message || "unable to logout, please try again.";

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

export const useLoginUserMutation = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data);
      dispatch(login(data));

      toast.success("Welcome back", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error) => {
      const message = error.message || "unable to login, please try again.";

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
