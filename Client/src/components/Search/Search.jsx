import React, { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Coordinates } from "../Context/ContextApi";
import { CDN_URL, SEARCH_IMG } from "../Utils/Constant";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import RestaurantCard from "../Restaurants/RestaurantCard";
import SearchRestaurantCard from "./SearchRestaurantCard";
import SearchDishes from "./SearchDishes";
import { useMediaQuery } from "react-responsive";

const Search = () => {
  const isLargeScreen = useMediaQuery({ minWidth: 550 });
  const [searchCarousel, setSearchCarousel] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [selectedCarousel, setSelectedCarousel] = useState([]);
  const [restaurant, setRestaurant] = useState([]);

  const [dishes, setdishes] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const filterOptions = ["Restaurant", "Dishes"];
  const [activeBtn, setActiveBtn] = useState("Restaurant");

  const handleFilter = (filterName) => {
    setActiveBtn(filterName);
  };

  const {
    cord: { lat, lng },
  } = useContext(Coordinates);

  const fetchsearchUrl = async () => {
    const res = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/landing/PRE_SEARCH?lat=${lat}&lng=${lng}`
    );
    const data = await res.json();

    let actualSearch = data?.data?.cards.find(
      (data) =>
        data?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget"
    )?.card?.card?.gridElements?.infoWithStyle?.info;
    setSearchCarousel(actualSearch);
  };

  const fetchRestaurant = async (query) => {
    if (!query) {
      setRestaurant([]);
      return;
    }
    const res = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${
        query || inputValue
      }&trackingId=undefined&submitAction=ENTER&queryUniqueId=f3dd4088-3032-60ad-d3ed-38c7c484735c&selectedPLTab=RESTAURANT`
    );
    const data = await res.json();

    let actualSearch = data?.data?.cards.find((data) => data?.groupedCard)
      ?.groupedCard?.cardGroupMap?.RESTAURANT?.cards;

    setRestaurant(actualSearch);
  };

  const fetchDishes = async (query) => {
    if (!query) {
      setdishes([]);
      return;
    }
    const res = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${query}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=9b8d4c6f-a64a-1a7f-8827-80feb75510f3&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22NA%22%2C%22cloudinaryId%22%3A%22p6hdp5icg4wvcxbeubxz%22%2C%22dishFamilyId%22%3A%22846613%22%2C%22dishFamilyIds%22%3A%5B%22846613%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D`
    );
    const data = await res.json();
    let actualDish = data?.data?.cards
      .find((data) => data?.groupedCard)
      ?.groupedCard?.cardGroupMap?.DISH?.cards.slice(1);

    setdishes(actualDish);
  };

  useEffect(() => {
    fetchsearchUrl();
  }, []);

  useEffect(() => {
    if (selectedEntity) {
      fetchRestaurant(selectedEntity);
      fetchDishes(selectedEntity);
    }
  }, [selectedEntity]);

  const extractQueryParameter = (url) => {
    const urlParams = new URLSearchParams(url.split("?")[1]);
    return urlParams.get("query");
  };

  const handleImageClick = (entityId) => {
    const query = extractQueryParameter(entityId);
    setSelectedEntity(query);
    setInputValue(query);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setInputValue(capitalizedValue);
    if (capitalizedValue === "") {
      setSelectedEntity("");
    }
  };

  const handleSearch = () => {
    fetchRestaurant(inputValue);
    fetchDishes(inputValue);
  };

  return (
    <div>
      <div>
        <div className="flex justify-center align-middle my-8 gap-5">
          <Input
            type="text"
            placeholder="Search For Dishes And Restuarants"
            className="outline-none w-1/2 focus:outline-none dark:text-white block"
            name="input"
            id="input"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            onClick={handleSearch}
            className="border-2 border-red-700 py-1 px-7 bg-[#d00000] hover:bg-transparent light:bg-white rounded-lg "
          >
            Search
          </button>
        </div>

        {isLargeScreen && (
          <div className="carousel flex justify-center align-middle">
            <Carousel
              className="border-none max-w-[1200px]"
              opts={{
                align: "start",
                loop: true,
                items: {
                  visible: {
                    min: 10,
                    max: 12,
                  },
                },
              }}
              plugins={[Autoplay({ delay: 3000 })]}
            >
              {searchCarousel && (
                <CarouselContent className="-ml-1">
                  {searchCarousel.map((item, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-1 sm:basis-[10%] md:basis-[5%] lg:basis-[10%] "
                    >
                      <div className="p-1 ml-4">
                        <Card
                          className="cursor-pointer"
                          onClick={() => handleImageClick(item.entityId)}
                          // onClick={() => handleClick(ids[index])}
                        >
                          <CardContent className="flex items-center justify-center p-1">
                            <div height="50" width="50" className="">
                              <img
                                src={SEARCH_IMG + item.imageId}
                                alt=""
                                className="object-cover rounded-sm"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              )}
            </Carousel>
          </div>
        )}

        {restaurant.length > 0 && (
          <div className="my-7 flex flex-wrap gap-3 justify-center align-middle">
            {filterOptions.map((filterName, index) => (
              <button
                onClick={() => handleFilter(filterName)}
                className={`mx-2 px-4 py-2 ${
                  activeBtn === filterName
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                } rounded`}
                key={index}
              >
                <p>{filterName}</p>
              </button>
            ))}
          </div>
        )}

        <div className="max-w-[1200px] mx-auto">
          <div className="flex gap-5 flex-wrap flex-row restCards">
            {activeBtn === "Dishes"
              ? dishes.map((item, index) => (
                  <div key={index}>
                    <Link
                      to={"/restaurants/" + item.card.card.restaurant.info.id}
                      key={item.card.card.restaurant.info.id}
                    >
                      <SearchDishes
                        resData={item}
                        key={item.card.card.restaurant.info.id}
                      />
                    </Link>
                  </div>
                ))
              : restaurant.map((item, index) => (
                  <div key={index}>
                    <Link
                      to={"/restaurants/" + item.card.card.info.id}
                      key={item.card.card.info.id}
                    >
                      <SearchRestaurantCard resData={item} />
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

/*
 */
