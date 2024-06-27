import { useEffect, useState } from "react";
import { MENU_API, MENU_IMG } from "../Utils/Constant";
import { SkeletonRestContainer } from "../Body/SkeletonRest";
import { MdCurrencyRupee } from "react-icons/md";
import { GiChickenOven } from "react-icons/gi";
import { Divider } from "@nextui-org/divider";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const RestaurantMenuCards1 = () => {
  const [menu, SetMenu] = useState(null);
  const [offer, setOffer] = useState([]);
  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    console.log(json.data);
    SetMenu(json.data);
    setOffer(
      json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
  };

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
    menu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card ||
    menu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[5]?.card?.card;

  const { title } =
    menu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card ||
    menu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[5]?.card?.card;

  if (!itemCards || itemCards.length === 0) return null;

  return (
    <div>
      <div>
        <div>
          <div className="helpHeading flex my-10 flex-col">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className=" hover:no-underline">
                  {title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="recomendedCards">
                    {itemCards.map((item, index) => (
                      <div className="box" key={index}>
                        <div className="menucards flex gap-8 py-7">
                          <div className="menuHeading flex flex-col w-[400px] gap-2.5">
                            <p className="text-[12px] font-bold">
                              {item.card.info.itemAttribute.vegClassifier ==
                              "NONVEG" ? (
                                <GiChickenOven className=" text-red-600 text-[15px]" />
                              ) : (
                                <i className="fa-solid fa-leaf text-green-800 text-[15px]"></i>
                              )}
                            </p>
                            <h1 className=" text-[16px] font-semibold">
                              {item.card.info.name}
                            </h1>
                            <div className="flex">
                              <MdCurrencyRupee className=" my-0.5 text-[16px] font-semibold" />
                              <h1 className="text-[16px] font-bold">
                                {item.card.info.price / 100 ||
                                  item.card.info.defaultPrice / 100}
                              </h1>
                            </div>
                            <h1 className="text-[15px]">
                              {item.card.info.description}
                            </h1>
                          </div>
                          <div className="menuImg">
                            <img
                              src={MENU_IMG + item.card.info.imageId}
                              alt=""
                              className="w-[156px] rounded-xl h-[170px] object-cover"
                            />
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

export default RestaurantMenuCards1;
