import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
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
import { Divider } from "@nextui-org/divider";
import { SkeletonCard } from "./SkeletonCard";
import NewSkeleton from "./NewSkeleton";
import { UrlState } from "@/Context";
import useRestaurantCategory from "../Hook/useRestaurantCategory";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const WhatsOnMind = () => {
  const isMobile = useMediaQuery("(min-width: 100px) and (max-width: 600px)");
  const { user } = UrlState();
  const { category, ids } = useRestaurantCategory(); // Destructure ids from the hook
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = (id) => {
    console.log(id); // Log the id
    navigate(`/category/${id}`); // Navigate to the category page with the id
  };

  if (isMobile) {
    return null;
  }

  return category.length === 0 ? (
    <NewSkeleton />
  ) : (
    <>
      <div className="max-w-[1230px] mx-auto mt-6 small">
        <div className="my-5">
          <div className=" text-[24px] font-semibold">
            {user?.user_metadata?.name + ", " + "What's on your mind?"}
          </div>
        </div>
        <div className="carousel">
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
            {category && (
              <CarouselContent className="-ml-1">
                {category.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-1 sm:basis-[1%] md:basis-[5%] lg:basis-[15%] "
                  >
                    <div className="p-1 ml-4">
                      <Card
                        className="cursor-pointer"
                        onClick={() => handleClick(ids[index])}
                      >
                        <CardContent className="flex items-center justify-center p-1">
                          <div height="180" width="144" className="">
                            <img
                              src={CDN_URL + item.imageId}
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
        <Divider className="mt-6 mb-8" />
      </div>
    </>
  );
};

export default WhatsOnMind;
