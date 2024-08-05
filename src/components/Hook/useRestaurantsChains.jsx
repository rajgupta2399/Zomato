import { Coordinates } from "../Context/ContextApi";
import { useContext, useState, useEffect } from "react";

const useRestaurantsChains = () => {
  const [listOfRest1, setListOfRest1] = useState([]);

  const {
    cord: { lat, lng },
  } = useContext(Coordinates);
  const Fetchres = async () => {
    const data = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const json = await data.json();

    let mainData = json?.data?.cards.find(
      (data) => data?.card?.card?.id === "top_brands_for_you"
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    let mainData2 = json?.data?.cards.find(
      (data) => data?.card?.card?.id === "restaurant_grid_listing"
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    // console.log(mainData, mainData2);

    setListOfRest1(mainData || mainData2);
  };

  useEffect(() => {
    Fetchres();
  }, [lat, lng]);
  return { listOfRest1 };
};

export default useRestaurantsChains;
