import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import "./App.scss";
import InstallPWA from "./components/InstallPWA/InstallPWA";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Any from "./pages/Any/Any";
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "*",
      element: <Any />,
    },
  ]);

  return (
    <Layout>
      <RouterProvider router={router} />
      <InstallPWA />
    </Layout>
  );
}

export default App;
