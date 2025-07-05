import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./routes/homePage/homePage";
import {Layout, RequireAuth} from "./routes/layout/layout";
import ListPage from "./routes/listPage/ListPage";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/ProfilePage";
import LoginPage from "./routes/loginPage/LoginPage";
import RegisterPage from "./routes/RegisterPage/RegisterPage";
import ProfileUpdatePage from "./routes/profileUpdatePage/ProfileUpdatePage";


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
          element:<ListPage />
        },
        {
          path:"/:id",
          element:<SinglePage />
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
          element:<ProfilePage />
        },
        {
          path:"/profile/update",
          element:<ProfileUpdatePage />
        },
      ]
    }
  ]);

  return (

    <RouterProvider router={router}/>
  );
}

export default App;