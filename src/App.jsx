import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from "./routes/homePage/homePage";
import {Layout, RequireAuth} from "./routes/layout/layout";
import ListPage from "./routes/listPage/ListPage";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/ProfilePage";
import LoginPage from "./routes/loginPage/LoginPage";
import RegisterPage from "./routes/RegisterPage/RegisterPage";
import ProfileUpdatePage from "./routes/profileUpdatePage/ProfileUpdatePage";
import NewPostPage from "./routes/newPostPage/NewPostPage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<HomePage />
        },
        {
          path:"/list",
          element:<ListPage />,
          loader: listPageLoader
        },
        {
          path:"/:id",
          element:<SinglePage />,
          loader: singlePageLoader
        },
        {
          path:"/login",
          element:<LoginPage />
        },
        {
          path:"/register",
          element:<RegisterPage />
        }

      ]
    },
    {
      path:"/",
      element: <RequireAuth />,
      children:[
        {
          path:"/profile",
          element:<ProfilePage />,
          loader: profilePageLoader
        },
        {
          path:"/profile/update",
          element:<ProfileUpdatePage />,          
        },
        {
          path:"/profile/newpost",
          element:<NewPostPage />
        },
      ]
    }
  ]);

  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;