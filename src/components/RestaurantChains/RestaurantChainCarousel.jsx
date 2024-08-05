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
import { Coordinates } from "../Context/ContextApi";
import { Link } from "react-router-dom";
import RestaurantCard from "../Restaurants/RestaurantCard";
import { Divider } from "@nextui-org/divider";
import NewSkeleton from "./NewSkeleton";
import useRestaurantsChains from "../Hook/useRestaurantsChains";

const RestaurantChainCarousel = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 550);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 550);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const { listOfRest1 } = useRestaurantsChains();
  if (isSmallScreen) {
    return null;
  }

  return listOfRest1.length === 0 ? (
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
              {listOfRest1.map((restaurant, index) => (
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
