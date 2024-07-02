import React from "react";
import { useState,useEffect } from "react";
import { MENU_API } from "../Utils/Constant";

const useRestaurantOffer = (resId) => {
    const [offer,setOffer] = useState([])
    useEffect(() => {
        fetchMenu();
      }, []);
    
      const fetchMenu = async () => {
        try {
          const response = await fetch(MENU_API + resId);
          const data = await response.json();
          setOffer(
            data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers ||
              []
          );
        } catch (error) {
          console.error("Failed to fetch menu:", error);
        }
      };

  return offer;
};

export default useRestaurantOffer;
