import React from "react";
import Banner from "../Hero/Banner";
import WhatsOnMind from "../Category/WhatsOnMind";
import Body from "../Body/Body";
import useRestaurantCategory from "../Hook/useRestaurantCategory";

const Home = () => {
  const { category } = useRestaurantCategory();
  return (
    <div>
      <WhatsOnMind />
      <Body />
    </div>
  );
};

export default Home;
