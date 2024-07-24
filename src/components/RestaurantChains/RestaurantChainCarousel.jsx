import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useContext } from "react";
import { CDN_URL } from "../Utils/Constant";
import useMediaQuery from "../Hook/useMediaQuery";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import NewSkeleton from "../Category/NewSkeleton";
import { Coordinates } from "../Context/ContextApi";
import { Link } from "react-router-dom";
import RestaurantCard from "../Restaurants/RestaurantCard";
import { Divider } from "@nextui-org/divider";

const RestaurantChainCarousel = () => {
  const isMobile = useMediaQuery("(min-width: 100px) and (max-width: 600px)");
  const [listOfRest, setListOfRest] = useState([]);
  if (isMobile) {
    return null;
  }

  const {
    cord: { lat, lng },
  } = useContext(Coordinates);

  const Fetchres = async () => {
    const data = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const json = await data.json();
    console.log(json.data);

    const slice =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants.slice(
        9,
        20
      );
    setListOfRest(slice);
  };

  useEffect(() => {
    Fetchres();
  }, [lat, lng]);

  return listOfRest.length === 0 ? (
    <div className=" mb-10 mt-0">
      <NewSkeleton />
    </div>
  ) : (
    <>
      <div className="max-w-[1230px] mx-auto mt-1 small mb-10">
        <div className="carousel">
          <Carousel
            className="border-none max-w-[1230px]"
            opts={{
              align: "start",
              loop: true,
              items: {
                visible: {
                  min: 10,
                  max: 20,
                },
              },
            }}
            plugins={[Autoplay({ delay: 10000 })]}
          >
            <CarouselContent className="py-5">
              {listOfRest.slice(0, 20).map((restaurant, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 sm:basis-[1%] md:basis-[5%] lg:basis-[309px]"
                >
                  <Card className="cursor-pointer h-[364px] ml-5 rounded-2xl">
                    <Link
                      to={"/restaurants/" + restaurant.info.id}
                      key={restaurant.info.id}
                    >
                      <RestaurantCard
                        resData={restaurant}
                        key={restaurant.info.id}
                      />
                    </Link>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 p-2 bg-gray-700 text-white rounded-full cursor-pointer">
              &#x2039;
            </CarouselPrevious>
            <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 p-2 bg-gray-700 text-white rounded-full cursor-pointer">
              &#x203A;
            </CarouselNext>
          </Carousel>
        </div>
        <Divider />
      </div>
    </>
  );
};

export default RestaurantChainCarousel;
