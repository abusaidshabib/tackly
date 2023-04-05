import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
import Register from "../../Pages/Register";
import Remainder from "../../Pages/Remainder";
import Task from "../../Pages/Task";
import PrivateRouter from "../PrivateRouter/PrivateRouter";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../Layout/Main");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <PrivateRouter><Home></Home></PrivateRouter>
      },
      {
        path: "/home",
        element: <PrivateRouter><Home></Home></PrivateRouter>
      },
      {
        path: "/task/:id",
        loader: ({ params }) => fetch(`http://localhost:5000/task/${params.id}`),
        element: <PrivateRouter> <Task></Task></PrivateRouter>
      },
      {
        path: "/remainder",
        element: <PrivateRouter><Remainder></Remainder></PrivateRouter>
      }
    ]
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/register",
    element: <Register></Register>
  }
])

export default router;