import { React, useContext } from "react";
import { useState, useEffect } from "react";
import RestaurantCard, {
  WithPromotedLabel,
} from "../Restaurants/RestaurantCard";
import { SkeletonCard } from "../Category/SkeletonCard";
import { SkeletonRest, SkeletonRestContainer } from "./SkeletonRest";
import { Heading } from "./Heading";
import InputButton from "../Hero/InputButton";
import Banner from "../Hero/Banner";
import { Link } from "react-router-dom";
import { Coordinates } from "../Context/ContextApi";
import RestaurantChainCarousel from "../RestaurantChains/RestaurantChainCarousel";
import { Heading1 } from "./Heading1";
import useRestaurantsChains from "../Hook/useRestaurantsChains";
import { useMediaQuery } from "react-responsive";

const Body = () => {
  const isLargeScreen = useMediaQuery({ minWidth: 550 });
  const { listOfRest1 } = useRestaurantsChains();
  const [filterRestaurants, setFilterRestaurants] = useState([]);
  const [listOfRest, setListOfRest] = useState([]);
  const [title, setTitle] = useState("");
  const RestaurantCardOffer = WithPromotedLabel(RestaurantCard);
  const {
    cord: { lat, lng },
  } = useContext(Coordinates);

  const ParentAlert = (data) => {
    setFilterRestaurants(data);
  };

  const Fetchres = async () => {
    const data = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const json = await data.json();
    // console.log(json?.data?.cards);

    let titleData = json?.data?.cards.find((data) => data?.card?.card?.title)
      ?.card?.card?.title;
    setTitle(titleData);

    let mainData = json?.data?.cards.find(
      (data) => data?.card?.card?.id === "top_brands_for_you"
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    let mainData2 = json?.data?.cards.find(
      (data) => data?.card?.card?.id === "restaurant_grid_listing"
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    setFilterRestaurants(mainData || mainData2);

    setListOfRest(mainData || mainData2);
  };

  useEffect(() => {
    Fetchres();
  }, [lat, lng]);

  return listOfRest.length === 0 ? (
    <SkeletonRestContainer />
  ) : (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex flex-col sm:px-0 px-6">
        <Heading title={title} />
        <RestaurantChainCarousel />
      </div>

      <div className=" flex flex-col sm:flex-row justify-between items-center mb-4 p-4">
        <Heading1 title={title} />
        <button
          className="px-3 py-2 bg-red-500 rounded-xl"
          onClick={() => {
            const filterLogic = filterRestaurants.filter((res) => {
              return res.info.avgRating > 4;
            });

            setFilterRestaurants(filterLogic);
            // console.log(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="flex gap-5 flex-wrap flex-row   justify-center">
        {filterRestaurants.map((restaurant, index) => (
          <Link
            to={"/restaurants/" + restaurant.info.id}
            key={restaurant.info.id}
          >
            {restaurant.info.aggregatedDiscountInfoV4 ? (
              <RestaurantCardOffer
                resData={restaurant}
                key={restaurant.info.id}
              />
            ) : (
              <RestaurantCard resData={restaurant} key={restaurant.info.id} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
