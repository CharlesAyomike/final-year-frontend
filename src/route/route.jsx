import { createBrowserRouter } from "react-router";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import ChangePassword from "../pages/ChangePassword";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Layout";
import TextGeneration from "../pages/TextGeneration";
import TexttoImage from "../pages/TextToImage";
import ImageToText from "../pages/ImageToText";

export let router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/forget-password",
    element: <ForgotPassword />,
  },
  {
    path: "/forget-password",
    element: <ForgotPassword />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },

  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <TextGeneration />,
      },
      {
        path: "text-to-image",
        element: <TexttoImage />,
      },
      {
        path: "image-to-text",
        element: <ImageToText />,
      },
    ],
  },
]);
