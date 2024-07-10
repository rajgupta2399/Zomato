import React, { Suspense, lazy } from "react";
import "./App.css";
import Headers from "./components/Header/Headers";
// import About from "./components/About/About";
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
import { SkeletonRestContainer } from "./components/Body/SkeletonRest";
import CategoryRestaurant from "./components/CategoryRestaurant/CategoryRestaurant";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css";
import { useState } from "react";
import { Coordinates } from "./components/Context/ContextApi";
import Search from "./components/Search/Search";

// this is use for optimisation our app..lazy loading helps to optimize our app and this makes our app fast
// use this case when app is producation ready means npm run build
// lazy loading
// chunking
// On Demand Loading
const About = lazy(() => import("./components/About/About"));
const SearchComponent = lazy(() => import("./components/Search/Search"));
function App() {
  const [cord, setCord] = useState({ lat: 28.7111675, lng: 77.0722759 });
  return (
    <>
      <Coordinates.Provider value={{ cord, setCord }}>
        <Headers />
        <Outlet />
        <Footer />
      </Coordinates.Provider>
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
          <Suspense fallback={<SkeletonRestContainer />}>
            <RequireAuth>
              <About />,
            </RequireAuth>
          </Suspense>
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
            <Cart />,
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
            <Orders />
          </RequireAuth>
        ),
      },
      {
        path: "/search",

        element: (
          <Suspense fallback={<SkeletonRestContainer />}>
            <RequireAuth>
              <SearchComponent />
            </RequireAuth>
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/category/:resId",
        element: <CategoryRestaurant />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
