import { Divider } from "@nextui-org/divider";
import React, { useContext, useState } from "react";
import { MENU_IMG } from "../Utils/Constant";
import { MdCurrencyRupee } from "react-icons/md";
import { GiChickenOven } from "react-icons/gi";
import { CardContext } from "../Context/ContextApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart } from "../Utils/Store/cartSlice";
import toast from "react-hot-toast";

const DetailMenu = ({ info, restMenuInfo }) => {
  const {
    name,
    defaultPrice,
    price,
    itemAttribute,
    ratings: {
      aggregatedRating: { rating, ratingCountV2 },
    },
    description = "",
    imageId,
  } = info;

  const [isDiffRes, setIsDiffRes] = useState(false);
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const getInfoFromLocalStorage = useSelector(
    (state) => state.cartSlice.restMenuInfo
  );
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    const isAdded = cartData.find((data) => data.id === info.id);
    if (!isAdded) {
      if (
        getInfoFromLocalStorage.name === restMenuInfo.name ||
        getInfoFromLocalStorage.length === 0
      ) {
        dispatch(addToCart({ info, restMenuInfo }));
        toast.success("Item Added to the Cart");
      } else {
        toast.error("Diiferent Restaurant Item");
        setIsDiffRes((prev) => !prev);
      }
    } else {
      toast.error("Already Added");
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart is Cleared");
    handleIsDiffRes();
  };
  const handleIsDiffRes = () => {
    setIsDiffRes((prev) => !prev);
  };
  return (
    <div className="box">
      <div className="menucards flex gap-8 py-7 px-3">
        <div className="menuHeading flex flex-col w-[400px] gap-2.5 menuDivBox ">
          <p className="text-[12px] font-bold menuHeading">
            {itemAttribute.vegClassifier === "NONVEG" ? (
              <GiChickenOven className=" text-red-600 text-[15px] menuHeading" />
            ) : (
              <i className="fa-solid fa-leaf text-green-800 text-[15px] menuHeading"></i>
            )}
          </p>
          <h1 className=" text-[16px] font-semibold menuHeading">{name}</h1>
          <div className="flex">
            <MdCurrencyRupee className=" my-0.5 text-[16px] font-semibold" />
            <h1 className="text-[16px] font-bold">
              {price / 100 || defaultPrice / 100}
            </h1>
          </div>
          <h1 className="text-[15px] menuHeading">{description}</h1>
        </div>
        <div className="menuImg relative">
          <img
            src={MENU_IMG + imageId}
            alt=""
            className="w-[156px] rounded-xl h-[170px] object-cover menuImg"
          />
          <div className="flex justify-center align-middle mt-3">
            <button
              className="border-2 border-red-500 px-6 py-2 text-center text-white bg-red-600 font-semibold text-[12px] rounded-lg absolute sm:top-36 top-18 sm:text-[15px] sm:px-10 sm:py-2"
              onClick={handleAddToCart}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
      <Divider />
      <hr className="my-5" />
      {isDiffRes && (
        <div className="w-[520px] h-[204px] flex flex-col gap-2 left-[33%] p-8 border z-50 shadow-md fixed bottom-10 dark:bg-white dark:text-black">
          <h1>Items already in cart</h1>
          <p>
            Your cart contains items from other restaurant. Would you like to
            reset your cart for adding items from this restaurant?
          </p>
          <div className="flex justify-between gap-3 w-full uppercase">
            <button
              onClick={handleIsDiffRes}
              className="border-2 w-1/2 p-3 border-green-600 text-green-600"
            >
              No
            </button>
            <button
              onClick={handleClearCart}
              className="  w-1/2 p-3 bg-green-600 text-white "
            >
              Yes, start Afresh
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailMenu;
