import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./routes/homePage/homePage";
import Layout from "./routes/layout/layout";
import ListPage from "./routes/listPage/ListPage";
import SinglePage from "./routes/singlePage/singlePage";


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
        }

      ]
    }
  ]);

  return (

    <RouterProvider router={router}/>
  );
}

export default App;