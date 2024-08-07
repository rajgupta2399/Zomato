import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Divider } from "@nextui-org/divider";
import { MENU_IMG } from "../Utils/Constant";
import { MdCurrencyRupee } from "react-icons/md";
import { GiChickenOven } from "react-icons/gi";
import DetailMenu from "./DetailMenu";

const MenuItem = ({ itemCards, title, restMenuInfo }) => {
  const handleAddToCart = () => {};
  return (
    <div className="helpHeading flex my-5 flex-col" key={title}>
      <Accordion type="single" collapsible className="w-full menuAccordian">
        <AccordionItem value="item-1" className="accordianMenuDiv">
          <AccordionTrigger className=" hover:no-underline">
            {title} ({itemCards.length})
          </AccordionTrigger>
          {itemCards.map(({ card: { info } }) => (
            <AccordionContent key={info.id} restMenuInfo={restMenuInfo}>
              <DetailMenu
                key={info.id}
                restMenuInfo={restMenuInfo}
                info={info}
              />
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MenuItem;
