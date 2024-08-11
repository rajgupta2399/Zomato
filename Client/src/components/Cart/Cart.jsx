import React, { useContext, useState } from "react";
import { CardContext } from "../Context/ContextApi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteItem } from "../Utils/Store/cartSlice";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { CDN_URL } from "../Utils/Constant";
import { addOrder } from "../Utils/Store/orderSlice";

const Cart = () => {
  // const { cartData, setCartData } = useContext(CardContext);

  //
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const restMenuInfo = useSelector((state) => state.cartSlice.restMenuInfo);
  // console.log(restMenuInfo);

  // console.log(cartData);

  const dispatch = useDispatch();

  const handleRemoveFromCart = (i) => {
    if (cartData.length > 1) {
      let newArray = [...cartData];
      newArray.splice(i, 1);
      dispatch(deleteItem(newArray));
      toast.success("Item Removed Succesfully");
    } else {
      handleClearCart();
      toast.success("Cart is Cleared");
    }
  };

  let totalPrice = cartData.reduce(
    (acc, curVal) => acc + curVal.price / 100 || curVal.defaultPrice / 100,
    0
  );

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart is Cleared");
  };
  const handlePlaceOrder = async () => {
    const stripe = await loadStripe(
      "pk_test_51Pl9c2RqhNQgZku40qHUyeerTvURu2VdukhDZbj8JJ4XMFdlpSFsDadVuaXj5DqEeZYfJLWDE997eNKvcqMcLMea00i9ehkR7E"
    );

    const body = {
      products: cartData,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "https://zomato-i67f.onrender.com/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    // Save the order before clearing the cart
    const orderDetails = {
      date: new Date().toLocaleString(), // Current date and time
      items: cartData,
    };

    dispatch(addOrder(orderDetails)); // Dispatch the order details to Redux

    handleClearCart(); // Clear the cart after saving the order

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  if (cartData.length === 0) {
    return (
      <div className="w-full">
        <div className="w-[50%]  mx-auto flex justify-center align-middle flex-col">
          <h1 className="font-semibold text-xl text-center mt-10 mb-4">kuch order krle bhai bhuka marega kya....</h1>
          <Link to="/" className="bg-green-500 p-2 inline-block my-3 text-center">
            Order Here
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-[95%] md:w-[800px] mx-auto">
        <Link to={`/restaurants/${restMenuInfo.id}`}>
          <div className="my-10 flex gap-5 justify-center">
            <img
              className="rounded-xl w-32 aspect-square"
              src={
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                restMenuInfo.cloudinaryImageId
              }
              alt=""
            />
            <div>
              <p className="text-2xl border-b-2 border-black pb-3 font-bold">
                {restMenuInfo.name}
              </p>
              <p className="mt-3 text-md ">{restMenuInfo.areaName}</p>
            </div>
          </div>
        </Link>
        <hr className="my-5 border-2" />
        <div>
          {cartData.map(
            ({
              name,
              defaultPrice,
              price,
              itemAttribute,
              ratings: {
                aggregatedRating: { rating, ratingCountV2 },
              },
              description = "",
              imageId,
            }) => {
              let trimDes = description.substring(0, 138) + "...";
              return (
                <>
                  <div
                    key={imageId}
                    className="flex w-full my-5 justify-between px-8"
                  >
                    <div className="w-[55%] md:w-[70%] ">
                      <h2 className="font-bold text-lg">{name}</h2>
                      <p className="font-bold text-lg">
                        ₹{defaultPrice / 100 || price / 100}{" "}
                      </p>
                    </div>
                    <div className="w-[30%] md:w-[120px] relative h-full">
                      <img
                        className="rounded-xl aspect-square"
                        src={
                          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                          imageId
                        }
                        alt=""
                      />
                      <button
                        onClick={handleRemoveFromCart}
                        className="bg-white absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-base text-red-500 font-bold rounded-xl border px-5 py-2 drop-shadow"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <hr className="my-10" />
                </>
              );
            }
          )}
        </div>
        <div className="px-9">
          <h1>
            Total - <span className="font-bold">₹{totalPrice}</span>
          </h1>
          <div className="flex gap-5 justify-between">
            <button
              onClick={handlePlaceOrder}
              className="p-3 bg-green-600 rounded-lg my-7"
            >
              Place order
            </button>
            <button
              onClick={handleClearCart}
              className="p-3 bg-green-600 rounded-lg my-7"
            >
              clear cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
