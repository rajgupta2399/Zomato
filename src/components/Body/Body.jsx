import { React, useContext } from "react";
import { useState, useEffect } from "react";
import RestaurantCard from "../Restaurants/RestaurantCard";
import { SkeletonCard } from "../Category/SkeletonCard";
import { SkeletonRest, SkeletonRestContainer } from "./SkeletonRest";
import { Heading } from "./Heading";
import InputButton from "../Hero/InputButton";
import Banner from "../Hero/Banner";
import { Link } from "react-router-dom";
import { Coordinates } from "../Context/ContextApi";

const Body = () => {
  const [filterRestaurants, setFilterRestaurants] = useState([]);
  const [listOfRest, setListOfRest] = useState([]);
  const [title, setTitle] = useState("");
  const {
    cord: { lat, lng },
  } = useContext(Coordinates);

  const ParentAlert = (data) => {
    setFilterRestaurants(data);
  };

  const Fetchres = async () => {
    const data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const json = await data.json();
    // console.log(
    //   json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );
    // console.log(json?.data);
    // console.log(json.data);
    const title = json?.data?.cards[2]?.card?.card?.title || "Default Title";


    setFilterRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    setListOfRest(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    setTitle(title);
  };

  useEffect(() => {
    Fetchres();
  }, [lat, lng]);


  return listOfRest.length === 0 ? (
    <SkeletonRestContainer />
  ) : (
    <div className=" max-w-[1200px] mx-auto">
      <div className="flex flex-col ">
        <Heading title={title} />
        <div className="flex justify-center align-middle">
          <InputButton SearchText={ParentAlert} />
        </div>
        <div className=" mx-5 mb-5 topRatedButton">
          <button
            className=" border-2 border-red-700 p-2 bg-[#d00000] hover:bg-transparent light:bg-white rounded-lg topRatedButton"
            onClick={() => {
              const filterLogic = filterRestaurants.filter((res) => {
                return res.info.avgRating > 4.2;
              });
              setFilterRestaurants(filterLogic);
            }}
          >
            Top Rated Restaurant
          </button>
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

export default Body;
