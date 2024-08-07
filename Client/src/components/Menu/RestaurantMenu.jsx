import { MENU_API, MENU_IMG } from "../Utils/Constant";
import { SkeletonRestContainer } from "../Body/SkeletonRest";
import { MdStars } from "react-icons/md";
import { IoIosBicycle } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { Card, CardContent } from "@/components/ui/card";
import { MdCurrencyRupee } from "react-icons/md";
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
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../Hook/useRestaurantMenu";
import { useState, useEffect } from "react";
import useRestaurantOffer from "../Hook/useRestaurantOffer";
import MenuItem from "./MenuItem";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const offer = useRestaurantOffer(resId);
  const [menuData, setMenuData] = useState([]);
  const [restMenuInfo, setRestMenuinfo] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [loadingOffer, setLoadingOffer] = useState(true);
  const [detail, setDetail] = useState([]);

  const fetchMenu = async () => {
    try {
      const data = await fetch(MENU_API + resId);
      const res = await data.json();
      let actualMenu = res?.data?.cards
        .find((data) => data?.groupedCard)
        ?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
          (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
        );
      setMenuData(actualMenu);
      let a = res?.data?.cards
        .find((data) => data?.groupedCard)
        ?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
          (data) => data?.card?.card?.itemCards
        );

      setDetail(a);
      let actualMenu1 = res?.data?.cards.find(
        (data) =>
          data?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
      )?.card?.card.info;
      setRestMenuinfo(actualMenu1);

      setMenu(res.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    } finally {
      setLoadingMenu(false);
    }
  };

  useEffect(() => {
    fetchMenu();
    if (offer) {
      setLoadingOffer(false);
    }
  }, [offer]);

  const {
    avgRating,
    totalRatingsString,
    costForTwoMessage,
    cuisines = [],
    areaName,
    sla = {},
    city,
    feeDetails = {},
  } = restMenuInfo;

  const text = menu?.cards?.[0]?.card?.card?.text || "Restaurant Menu";

  if (loadingMenu || loadingOffer) return <SkeletonRestContainer />;

  const { name, defaultPrice, price } = detail;

  const handleAddToCart = (name, price) => {};

  return (
    <div>
      <div className="flex justify-center align-middle my-10">
        <div>
          <div className="heading">
            <h1 className=" text-[25px] font-semibold menuHeading">{text}</h1>
          </div>

          {/**Rest Info */}

          <div className="resInfo my-3 menuDiv1">
            <div className="resInfoContainer border-2 border-black sm:h-[160px] h-full w-[40vw] py-[16px] px-5 rounded-xl dark:border-white menuDiv2 ">
              <div className="rating flex flex-col my-2 menuDiv3">
                <div className="flex flex-row gap-1 menuDiv4">
                  <MdStars className=" text-[#1E943B] text-[20px]" />
                  <p className=" text-[14px] capitalized font-semibold flex flex-row gap-1">
                    {avgRating ? avgRating : "4.4"}
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

          {/**Deals For You Discount Chain */}
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
              {menuData.map((menuItem) => {
                const itemCards = menuItem?.card?.card?.itemCards || [];
                const title = menuItem?.card?.card?.title || "";

                return (
                  <div>
                    <MenuItem itemCards={itemCards} title={title} restMenuInfo={restMenuInfo} key={title} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
