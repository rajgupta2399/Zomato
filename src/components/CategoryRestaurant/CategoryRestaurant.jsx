import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import RestaurantCard from "../Restaurants/RestaurantCard";
import { SkeletonRestContainer } from "../Body/SkeletonRest";
import { Link } from "react-router-dom";
import { Coordinates } from "../Context/ContextApi";
const CategoryRestaurant = () => {
  const { resId } = useParams();
  const [resCatMenu, setResCatMenu] = useState(null);
  const [filterRestaurants, setFilterRestaurants] = useState([]);
  console.log(resCatMenu);

  const {
    cord: { lat, lng },
  } = useContext(Coordinates);
  // console.log(title)
  console.log(resId);
  const fetchMenu = async () => {
    try {
      const data = await fetch(
        `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&collection=${resId}&tags=layout_CCS_Pizza&sortBy=&filters=&type=rcv2&offset=0&page_type=null`
      );
      const json = await data.json();
      setResCatMenu(json?.data);

      const slicedData = json?.data?.cards?.slice(3, 10) || [];
      const extractedCards = slicedData.map((item) => item.card?.card);
      setFilterRestaurants(extractedCards);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [lat, lng]);

  const title =
    resCatMenu?.cards?.[0]?.card?.card?.title || "No title available";
  const description =
    resCatMenu?.cards?.[0]?.card?.card?.description ||
    "No description available";

  const selectedObjects = resCatMenu?.cards?.slice(3, 10) || [];
  console.log(selectedObjects);

  return resCatMenu === null ? (
    <SkeletonRestContainer />
  ) : (
    <div className="max-w-[1200px] mx-auto">
      <div>
        <div className="mt-6 mb-2">
          <h1 className="text-3xl font-semibold">{title}</h1>
        </div>
        <div className="mb-5 mt-2">
          <h2 className="text-md">{description}</h2>
        </div>
        <div className="my-5 mb-8">
          <h1 className="text-xl font-bold">Restaurant To Explore</h1>
        </div>
      </div>
      <div className="flex gap-5 flex-wrap flex-row restCards">
        {filterRestaurants.map((restaurant, index) => (
          <Link
            to={"/restaurants/" + restaurant.info.id}
            key={restaurant.info.id}
          >
            <RestaurantCard resData={restaurant} key={restaurant.info.id} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryRestaurant;

/*
 */
