import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { MdStars } from "react-icons/md";
import { CDN_URL } from "../Utils/Constant";
const RestaurantCard = (props) => {
  const { resData } = props;
  // console.log(resData)

  const { cloudinaryImageId, name, avgRating, cuisines, costForTwo, sla ,locality} =
    resData?.info;

  return (
    <div>
      <div className="restaurantContainer mb-10 flex gap-5 flex-wrap flex-row">
        <Card className="py-4 w-[285px]  dark:bg-[#1D232A] cursor-pointer">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl px-1 h-[200px]"
              src={CDN_URL + cloudinaryImageId}
              width={270}
            />
          </CardBody>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-[18px] capitalize font-semibold text-ellipsis whitespace-nowrap overflow-hidden w-[250px]">{name}</p>

            <div className="flex flex-row gap-3 py-[5px]">
              <div className="flex flex-row gap-1">
                <MdStars className=" text-[#1E943B] text-[20px]" />
                <p className=" text-[14px] capitalize font-bold">{avgRating}</p>
              </div>
              <div>
                <p className=" text-[14px] capitalize font-semibold">
                  {sla.slaString}
                </p>
              </div>
            </div>

            <p className=" text-[15px] pb-1 text-ellipsis whitespace-nowrap overflow-hidden w-[240px]">
              {cuisines.join(", ")}
            </p>
            <p className=" text-[15px]">{locality}</p>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default RestaurantCard;
