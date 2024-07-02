import { useEffect, useState } from "react";
import { MENU_API, MENU_IMG } from "../Utils/Constant";
import { SkeletonRestContainer } from "../Body/SkeletonRest";
import { MdCurrencyRupee } from "react-icons/md";
import { GiChickenOven } from "react-icons/gi";
import { Divider } from "@nextui-org/divider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../Hook/useRestaurantMenu";

const RestaurantMenuCards2 = () => {
  const { resId } = useParams();

  const menu = useRestaurantMenu(resId);

  if (menu === null) return <SkeletonRestContainer />;

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
    menu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[5]?.card?.card ||
    menu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[6]?.card?.card;

  const { title } =
    menu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[5]?.card?.card ||
    menu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[6]?.card?.card;

  if (!itemCards || itemCards.length === 0) return null;

  return (
    <div>
      <div>
        <div>
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
      </div>
    </div>
  );
};

export default RestaurantMenuCards2;
