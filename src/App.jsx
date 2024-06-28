import "./App.css";
import Headers from "./components/Header/Headers";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import { createBrowserRouter, Outlet } from "react-router-dom";
import ErrorPage from "./components/ErrorP/ErrorPage";
import RestaurantMenu from "./components/Menu/RestaurantMenu";
import Footer from "./components/Footer/Footer";
import Auth from "./components/Auth/Auth";
import UrlProvider from "./Context";
import RequireAuth from "./components/Auth/RequireAuth";
import Wishlist from "./components/Wishlist/Wishlist";
import Orders from "./components/Orders/Orders";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <>
      <Headers />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <RequireAuth>
            <Home />,
          </RequireAuth>
        ),
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/about",

        element: (
          <RequireAuth>
            <About />,
          </RequireAuth>
        ),
      },
      {
        path: "/contact",

        element: (
          <RequireAuth>
            <Contact />,
          </RequireAuth>
        ),
      },
      {
        path: "/cart",

        element: (
          <RequireAuth>
            <Cart/>,
          </RequireAuth>
        ),
      },
      {
        path: "/wishlist",

        element: (
          <RequireAuth>
            <Wishlist />
          </RequireAuth>
        ),
      },
      {
        path: "/orders",

        element: (
          <RequireAuth>
            <Orders/>
          </RequireAuth>
        ),
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
