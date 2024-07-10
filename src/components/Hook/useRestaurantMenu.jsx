import React from "react";
import { useEffect, useState } from "react";
import { MENU_API } from "../Utils/Constant";

const useRestaurantMenu = (resId) => {
  const [menu, SetMenu] = useState(null);
  //   const [offer, setOffer] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch(MENU_API + resId);
      const data = await response.json();
      SetMenu(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
  };

  return menu;
};

export default useRestaurantMenu;
