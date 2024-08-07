import React from "react";
import { useState, useEffect } from "react";
import { MENU_API } from "../Utils/Constant";

const useRestaurantOffer = (resId) => {
  const [offer, setOffer] = useState([]);
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch(MENU_API + resId);
      const data = await response.json();

      let actualMenu1 = data?.data?.cards.find((data) =>
        data?.card?.card?.["@type"].includes("v2.GridWidget")
      )?.card?.card?.gridElements?.infoWithStyle?.offers;
      // console.log(actualMenu1);
      setOffer(actualMenu1 || "");
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
  };

  return offer;
};

export default useRestaurantOffer;
