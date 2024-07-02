import react from "@heroicons/react";
import { useEffect, useState } from "react";
import { MENU_API, MENU_IMG } from "../Utils/Constant";
import { SkeletonRestContainer } from "../Body/SkeletonRest";
import { MdStars } from "react-icons/md";
import { IoIosBicycle } from "react-icons/io";
import { MdCurrencyRupee } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { Card, CardContent } from "@/components/ui/card";
import { GiChickenOven } from "react-icons/gi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Divider } from "@nextui-org/divider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RestaurantMenuCards from "./RestaurantMenuCards";
import RestaurantMenuCards1 from "./RestaurantMenuCards1";
import RestaurantMenuCards2 from "./RestaurantMenuCards2";
import RestaurantMenuCards3 from "./RestaurantMenuCards3";
import RestaurantMenuCards4 from "./RestaurantMenuCards4";
import RestaurantMenuCards5 from "./RestaurantMenuCards5";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../Hook/useRestaurantMenu";
import useRestaurantOffer from "../Hook/useRestaurantOffer";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const menu = useRestaurantMenu(resId);
  const offer = useRestaurantOffer(resId);

  if (menu === null) return <SkeletonRestContainer />;

  if (!menu) return <p>Restaurant not available</p>;

  const { text } = menu?.cards[0]?.card?.card;

  const {
    avgRating,
    totalRatingsString,
    costForTwoMessage,
    cuisines,
    areaName,
    sla,
    city,
    feeDetails,
  } = menu?.cards[2]?.card?.card?.info;

  const { itemCards } =
    menu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card ||
    menu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card;
  const { title } =
    menu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card ||
    menu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card;

  if (!itemCards || itemCards.length === 0) return null;
  if (!itemCards || itemCards.length === 0)
    return <p>Restaurant not available</p>;

  return (
    <div>
      <div className="flex justify-center align-middle my-10">
        <div>
          <div className="heading">
            <h1 className=" text-[25px] font-semibold menuHeading">{text}</h1>
          </div>

          <div className="resInfo my-3 menuDiv1">
            <div className="resInfoContainer border-2 border-black h-[160px] w-[40vw] py-[16px] px-5 rounded-xl dark:border-white menuDiv2">
              <div className="rating flex flex-col my-2 menuDiv3">
                <div className="flex flex-row gap-1 menuDiv4">
                  <MdStars className=" text-[#1E943B] text-[20px]" />
                  <p className=" text-[14px] capitalized font-semibold flex flex-row gap-1">
                    {avgRating}
                    <div></div>({totalRatingsString}) <div></div>{" "}
                    {costForTwoMessage}
                  </p>
                </div>

                <div className="cuisene my-1 menuDiv5">
                  <p className=" text-orange-500 font-semibold">
                    {cuisines.join(", ")}
                  </p>
                </div>
                <div className="area-time flex flex-row gap-3 font-semibold my-1.5 menuDiv6">
                  <p className="text-[15px]">
                    {areaName}, {city}
                  </p>
                  <p className="capitalize text-[15px]">{sla.slaString}</p>
                </div>
                <div className="distance my-1 menuDiv7">
                  <div className="flex gap-2 text-[15px]">
                    <IoIosBicycle className="text-[20px]" />
                    <p>{sla.lastMileTravelString} |</p>
                    <div className="flex">
                      <MdCurrencyRupee className=" my-0.5" />
                      <p>
                        {feeDetails.totalFee / 100} {feeDetails.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="offerCarousel  mt-6 menuNone">
            <div className="offerheading my-2">
              <h1 className=" font-semibold text-[20px] my-2 menuHeading">
                Deals For You
              </h1>
            </div>
            <div className="px-[95px] my-5 border-2 py-5 rounded-xl border-black dark:border-white">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                  items: {
                    visible: {
                      min: 2,
                      max: 3,
                    },
                  },
                }}
                plugins={[Autoplay({ delay: 3000 })]}
                className="w-full max-w-sm"
              >
                {offer && (
                  <CarouselContent>
                    {offer.map((item, index) => (
                      <CarouselItem
                        key={index}
                        className="pl-1 sm:basis-[1%] md:basis-[5%] lg:basis-[65%]"
                      >
                        <div className="p-1 ml-4">
                          <Card className=" cursor-pointer">
                            <CardContent className="flex items-center justify-center p-1">
                              <div className="w-[350px] h-[85px] bg-white rounded-lg border-2 border-white py-2">
                                <div className="flex gap-2 px-2">
                                  <div>
                                    <BiSolidOffer className="text-orange-600 text-[35px] mt-3" />
                                  </div>
                                  <div>
                                    <p className="text-black mt-1.5 font-semibold">
                                      {item.info.header}
                                    </p>
                                    <p className="text-black mt-0 font-bold">
                                      {item.info.couponCode ||
                                        item.info.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                )}
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          <div className="divider flex justify-center align-middle">
            <Divider className="" />
          </div>

          <div className="recomendation">
            <div className="helpHeading flex my-10 flex-col">
              <Accordion
                type="single"
                collapsible
                className="w-full menuAccordian"
              >
                <AccordionItem value="item-1" className="accordianMenuDiv">
                  <AccordionTrigger className=" hover:no-underline">
                    {title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="recomendedCards ">
                      {itemCards.map((item) => (
                        <div className="box" key={item.card.info.id}>
                          <div className="menucards flex gap-8 py-7">
                            <div className="menuHeading flex flex-col w-[400px] gap-2.5 menuDivBox">
                              <p className="text-[12px] font-bold menuHeading">
                                {item.card.info.itemAttribute.vegClassifier ==
                                "NONVEG" ? (
                                  <GiChickenOven className=" text-red-600 text-[15px] menuHeading" />
                                ) : (
                                  <i className="fa-solid fa-leaf text-green-800 text-[15px] menuHeading"></i>
                                )}
                              </p>
                              <h1 className=" text-[16px] font-semibold menuHeading">
                                {item.card.info.name}
                              </h1>
                              <div className="flex">
                                <MdCurrencyRupee className=" my-0.5 text-[16px] font-semibold" />
                                <h1 className="text-[16px] font-bold">
                                  {item.card.info.price / 100 ||
                                    item.card.info.defaultPrice / 100}
                                </h1>
                              </div>
                              <h1 className="text-[15px] menuHeading">
                                {item.card.info.description}
                              </h1>
                            </div>
                            <div className="menuImg">
                              <img
                                src={MENU_IMG + item.card.info.imageId}
                                alt=""
                                className="w-[156px] rounded-xl h-[170px] object-cover menuImg"
                              />
                              <div className="flex justify-center align-middle mt-3">
                                <button className="border-2 border-red-500 px-10 py-2 text-center text-white bg-red-600 font-semibold text-[15px] rounded-lg">
                                  ADD
                                </button>
                              </div>
                            </div>
                          </div>
                          <Divider />
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="menu1">
            <RestaurantMenuCards />
          </div>

          <div className="menu2">
            <RestaurantMenuCards1 />
          </div>

          <div className="menu3">
            <RestaurantMenuCards2 />
          </div>

          <div className="menu4">
            <RestaurantMenuCards3 />
          </div>

          <div className="menu5">
            <RestaurantMenuCards4 />
          </div>

          <div className="menu6">
            <RestaurantMenuCards5 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
