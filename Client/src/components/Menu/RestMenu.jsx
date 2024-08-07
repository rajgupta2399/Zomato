import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import { GiChickenOven } from "react-icons/gi";
import { MENU_IMG } from "../Utils/Constant";
import { Divider } from "@nextui-org/divider";
import { SkeletonRestContainer } from "../Body/SkeletonRest";

const RestMenu = () => {
  const [menu, setMenu] = useState([]);

  if (menu === null) return <SkeletonRestContainer />;

  if (!menu) return <p>Restaurant not available</p>;

  const fetchMenu = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=10576&catalog_qa=undefined&submitAction=ENTER"
    );
    const res = await data.json();
    console.log(res.data);
    console.log(res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR);
    let actualMenu =
      (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (data) => data?.card?.card?.itemCards
      );
    setMenu(actualMenu);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div>
      {menu.map(
        ({
          card: {
            card: { itemCards, title },
          },
        }) => (
          <div className="helpHeading flex my-10 flex-col">
            <Accordion
              type="single"
              collapsible
              className="w-full menuAccordian"
            >
              <AccordionItem value="item-1" className="accordianMenuDiv">
                <AccordionTrigger className=" hover:no-underline">
                  {title} {itemCards.length}
                </AccordionTrigger>
                {itemCards.map(({ card: { info } }) => (
                  <AccordionContent>
                    <div className="box" key={info.id}>
                      <div className="menucards flex gap-8 py-7">
                        <div className="menuHeading flex flex-col w-[400px] gap-2.5 menuDivBox">
                          <p className="text-[12px] font-bold menuHeading">
                            {info.itemAttribute.vegClassifier == "NONVEG" ? (
                              <GiChickenOven className=" text-red-600 text-[15px] menuHeading" />
                            ) : (
                              <i className="fa-solid fa-leaf text-green-800 text-[15px] menuHeading"></i>
                            )}
                          </p>
                          <h1 className=" text-[16px] font-semibold menuHeading">
                            {info.name}
                          </h1>
                          <div className="flex">
                            <MdCurrencyRupee className=" my-0.5 text-[16px] font-semibold" />
                            <h1 className="text-[16px] font-bold">
                              {info.price / 100 || info.defaultPrice / 100}
                            </h1>
                          </div>
                          <h1 className="text-[15px] menuHeading">
                            {info.description}
                          </h1>
                        </div>
                        <div className="menuImg">
                          <img
                            src={MENU_IMG + info.imageId}
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
                  </AccordionContent>
                ))}
              </AccordionItem>
            </Accordion>
          </div>
        )
      )}
    </div>
  );
};

export default RestMenu;
