import React from "react";
import { useSelector } from "react-redux";

const Orders = () => {
  const orders = useSelector((state) => state.orderSlice.orders) || [];

  return (
    <div className="w-full">
      <div className="w-[95%] md:w-[800px] mx-auto">
        <h1 className="text-2xl font-bold my-5">Your Orders</h1>

        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders
            .slice()
            .reverse()
            .map((order, index) => (
              <div key={index} className="mb-10">
                <p className="font-bold">Order Date: {order.date}</p>
                <div className="sm:w-full sm:px-0 px-12">
                  {Array.isArray(order.items) && order.items.length > 0 ? (
                    order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between py-2 border-b items-center"
                      >
                        <div className="flex items-center">
                          <img
                            className="w-16 h-16 rounded-md mr-4"
                            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.imageId}`}
                            alt={item.name}
                          />
                          <p>{item.name}</p>
                        </div>
                        <p>₹{item.price / 100 || item.defaultPrice / 100}</p>
                      </div>
                    ))
                  ) : (
                    <p>No items in this order.</p>
                  )}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Orders;
