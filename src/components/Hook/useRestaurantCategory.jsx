import React from "react";
import { useState, useEffect } from "react";

const useRestaurantCategory = () => {
  const [category, setCategory] = useState([]);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=28.7111675&lng=77.0722759&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);
    console.log(
      json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info
    );
    console.log(json?.data);

    setCategory(
      json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info
    );

    const infoArray =
      json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info || [];

    const extractedIds = infoArray
      .map((item) => {
        const link = item?.action?.link || "";
        const idMatch = link.match(/id=(\d+)/);
        return idMatch ? idMatch[1] : null;
      })
      .filter((id) => id !== null);

    setIds(extractedIds);
  };

  return { category, ids };
};

export default useRestaurantCategory;
