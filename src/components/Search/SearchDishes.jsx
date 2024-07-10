import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { MdStars } from "react-icons/md";
import { CDN_URL } from "../Utils/Constant";
const SearchDishes = (props) => {
  const { resData } = props;
  // console.log(resData)

  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    sla,
    locality,
    imageId,
  } = resData?.card.card.restaurant.info || resData?.card.card.info;

  return (
    <div>
      <div className="restaurantContainer mb-10 flex gap-5 flex-wrap flex-row">
        <Card className="py-4 w-[386px]  dark:bg-[#1D232A] cursor-pointer">
          <CardHeader className="pb-0 pt-2 px-4 flex-col">
            <p className="text-[18px] capitalize font-semibold text-ellipsis whitespace-nowrap overflow-hidden w-[250px] text-center">
              {name}
            </p>

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

            <CardBody className="overflow-visible py-2">
              <div className="flex flex-row-reverse gap-10 justify-center align-middle">
                <div>
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl px-1 h-[80px]"
                    src={
                      resData?.card.card.info.imageId
                        ? CDN_URL + resData?.card.card.info.imageId
                        : "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                    }
                    width={80}
                  />
                </div>
                <div className="flex justify-center align-middle gap-3 mt-6">
                  <div>
                    <p className="text-ellipsis whitespace-nowrap overflow-hidden w-[100px]">{resData?.card.card.info.name}</p>
                  </div>
                  <div className="flex gap-1"> <i className="fa-solid fa-indian-rupee-sign text-sm mt-1"></i>{resData?.card.card.info.price / 100}</div>
                </div>
              </div>
            </CardBody>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default SearchDishes;
