import { Fragment, useContext, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { BiSolidOffer } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoMdHelpBuoy } from "react-icons/io";
import { Input } from "@/components/ui/input";

import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FaCartShopping } from "react-icons/fa6";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import MoonIcon from "../Icons/MoonIcon.jsx";
import SunIcon from "../Icons/SunIcon.jsx";
import { useTheme } from "next-themes";
import Profile from "./Profile.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Divide, Heart, LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/Context.jsx";
import useFetch from "../Hook/useFetchHook.jsx";
import { logout } from "@/db/apiAuth.js";
import { BarLoader } from "react-spinners";
import useOnlineStatus from "../Hook/useOnlineStatus.jsx";
import { Sidebar } from "primereact/sidebar";
import InputButton from "../Hero/InputButton.jsx";
import { CardContext, Coordinates } from "../Context/ContextApi.js";
import { Divider } from "@nextui-org/divider";
import { useSelector } from "react-redux";
// import { Button } from "primereact/button";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Headers() {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const styleCard = {
    fontFamily: "Poppins",
    backgroundColor: resolvedTheme === "dark" ? "#1D232A" : "#fff",
    fontSize: "16px",
    color: resolvedTheme === "dark" ? "#fff" : "#1D232A",
  };

  // for borders
  // border-solid border-4 border-red-600

  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();
  const { loading, fn: fnLogout } = useFetch(logout);
  const onlineStatus = useOnlineStatus();
  const { cord, setCord } = useContext(Coordinates);
  const [address, setAddress] = useState("Delhi NCR");
  // const { cartData,setCartData } = useContext(CardContext);

  const cartData = useSelector((state) => state.cartSlice.cartItems);

  async function searchResultFunc(e) {
    if (e == "") return;
    const data = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/place-autocomplete?input=${e}`
    );
    const json = await data.json();
    console.log(json);
    setSearchResult(json.data);
  }

  async function fetchLangAndLong(id) {
    if (id == "") return;
    const data = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/address-recommend?place_id=${id}`
    );
    const json = await data.json();
    setCord({
      lat: json.data[0].geometry.location.lat,
      lng: json.data[0].geometry.location.lng,
    });
    setAddress(json.data[0].formatted_address);
    setVisible(false);
  }

  return (
    <div>
      <div className="card flex justify-content-center">
        <Sidebar
          visible={visible}
          onHide={() => setVisible(false)}
          className="sm:w-full w-[90%] md:w-[60%] lg:w-[37%] dark:bg-[#1D232A]"
        >
          <h2 className="text-center my-2 dark:text-white">
            Search Area & Streets
          </h2>
          <div className="flex justify-center align-middle">
            <Input
              type="email"
              placeholder="Search For Area"
              className=" w-full outline-none lg:w-[1/2] focus:outline-none dark:text-white block "
              name="input"
              id="input"
              onChange={(e) => searchResultFunc(e.target.value)}
            />
          </div>
          <div className="flex justify-center align-middle my-5 mx-4">
            <ul>
              {searchResult.map((data, index) => (
                <li
                  onClick={() => fetchLangAndLong(data.place_id)}
                  className="my-6 cursor-pointer hover:text-orange-500 transition-all delay-100 dark:text-white"
                  key={index}
                >
                  <i className="fa-solid fa-location-dot mr-2 dark:text-white"></i>
                  {data.structured_formatting.main_text}{" "}
                  <p className="text-sm opacity-60 dark:text-white mb-3">
                    {data.structured_formatting.secondary_text}
                  </p>
                  <Divider />
                </li>
              ))}
            </ul>
          </div>
        </Sidebar>
      </div>

      <header
        className=" bg-white font-Poppins font-sans h-[70px] w-full z-20 shadow-lg dark:bg-[#1D232A]"
        style={styleCard}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between py-[4.5px] px-[8.5px] lg:px-8 font-sans text-red-500 w-full "
          aria-label="Global"
          style={styleCard}
        >
          <div className="flex lg:flex-1 gap-5" style={styleCard}>
            <Link className="-m-1.5 p-1.5" to="/">
              <span className="sr-only text-red-500"></span>
              <img
                className=" h-14 w-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Zomato_Logo.png/1200px-Zomato_Logo.png?20201120190035"
                alt=""
              />
            </Link>

            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setVisible(true)}
              styleCard={styleCard}
            >
              <p
                className="font-bold border-b-2 dark:border-white dark:text-white hover:text-orange-500 transition-all delay-100 ease-in-out whitespace-nowrap w-[100px] overflow-hidden text-ellipsis text-center
              styleCard={styleCard}
              "
              >
                {address}
              </p>
              <i className="fa-solid fa-angle-down mt- text-lg dark:text-white"></i>
            </div>
          </div>

          <div className="flex lg:hidden" style={styleCard}>
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group
            className="hidden lg:flex lg:gap-x-12"
            style={styleCard}
          >
            <Popover className="relative">
              <Popover.Button
                className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 font-sans hover:text-red-600 transition ease-in-out delay-100"
                style={styleCard}
              >
                <Link to="/">
                  <i className="fa-solid fa-utensils px-2 cursor-pointer "></i>
                  Dining Out
                </Link>
              </Popover.Button>
            </Popover>

            <Link
              to="/search"
              className="text-sm font-semibold leading-6 text-gray-900  hover:text-red-600 transition ease-in-out delay-100 cursor-pointer "
              style={styleCard}
            >
              <i className="fa-solid fa-magnifying-glass px-2"></i>
              Search
            </Link>

            <Link
              to="/About"
              className="text-sm font-semibold leading-6 text-gray-900  hover:text-red-600 transition ease-in-out delay-100 cursor-pointer "
              style={styleCard}
            >
              <BiSolidOffer className=" inline-block text-xl mr-1 mb-1" />
              Offers
            </Link>
            <Link
              to="/Contact"
              className="text-sm font-semibold leading-6 text-gray-900  hover:text-red-600 transition ease-in delay-100 cursor-pointer "
              style={styleCard}
            >
              <IoMdHelpBuoy className=" inline-block text-2xl mr-1" />
              Help
            </Link>
            <Link
              to="/cart"
              className="text-sm font-semibold leading-6 text-gray-900  hover:text-red-600 transition ease-in delay-100 cursor-pointer "
              style={styleCard}
            >
              <FaCartShopping className="inline-block text-xl mr-1 mb-1" />
              Cart {cartData.length}
            </Link>
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3">
            {!user ? (
              <Button onClick={() => navigate("/auth")}>Login</Button>
            ) : (
              <DropdownMenu className="">
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={user?.user_metadata?.profile_pic}
                      className="object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" w-40">
                  <DropdownMenuLabel className="text-center">
                    {onlineStatus ? "✅" : "🔴"}
                    {"Welcome," + user?.user_metadata?.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LinkIcon className="mr-2" />
                    <span
                      onClick={() => {
                        navigate("/orders");
                      }}
                    >
                      My Orders
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Heart className="mr-2 text-pink-600" />
                    <span
                      onClick={() => {
                        navigate("/wishlist");
                      }}
                    >
                      WishList
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2" />
                    <span
                      onClick={() => {
                        fnLogout().then(() => {
                          fetchUser();
                          navigate("/auth");
                        });
                      }}
                    >
                      LogOut
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <button
              onClick={() => {
                setTheme(resolvedTheme === "light" ? "dark" : "light");
              }}
              type="button"
              className="rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
        </nav>
        <Dialog
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel
            className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
            style={styleCard}
          >
            <div className="flex items-center justify-between">
              <Link className="-m-1.5 p-1.5" to="/">
                <img
                  className="h-14 w-auto"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Zomato_Logo.png/1200px-Zomato_Logo.png?20201120190035"
                  alt=""
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root" style={styleCard}>
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3" style={styleCard}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          style={styleCard}
                        >
                          <Link to="/">Home</Link>
                        </Disclosure.Button>
                      </>
                    )}
                  </Disclosure>

                  <Link
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    to="/Search"
                    style={styleCard}
                  >
                    Search
                  </Link>

                  <Link
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    to="/Cart"
                    style={styleCard}
                  >
                    Cart
                  </Link>

                  <Link
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    to="/Contact"
                    style={styleCard}
                  >
                    Help
                  </Link>
                </div>

                <div className="py-6">
                  <Link
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    to="/Contact"
                    style={styleCard}
                  >
                    <span
                      onClick={() => {
                        fnLogout().then(() => {
                          fetchUser();
                          navigate("/auth");
                        });
                      }}
                    >
                      LogOut
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}
