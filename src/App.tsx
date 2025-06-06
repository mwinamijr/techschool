import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

<ToastContainer position="top-right" autoClose={3000} hideProgressBar />;

function App() {
  return <RouterProvider router={router} />;
}

export default App;
