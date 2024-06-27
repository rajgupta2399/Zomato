import React from "react";
import MoreAbout from "./MoreAbout";

const About = () => {
  return (
    <div>
      <div className="cont bg-[#FE5005]">
        <div className="container flex align-middle justify-center h-[25vw]">
          <div className="firstImage py-20">
            <div className="imgDiv">
              <img
                src="https://www.swiggy.com/about-us/wp-content/uploads/2024/04/DE-on-bike-2-2.png"
                alt=""
              />
            </div>
          </div>

          <div className="secondText">
            <div className="textDiv">
              <div className="heading flex justify-center align-middle py-[135px]">
                <div>
                  <h1 className=" text-5xl font-semibold text-center">
                    About Zomato
                  </h1>
                  <h3 className="text-center text-lg py-2">
                    Swiggy is a new-age consumer-first organization offering an
                    easy-to-use convenience platform, accessible through a
                    unified app.
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="thirdImg float-right py-20">
            <div className="imgDiv w-[240px] h-[300px]">
              <img
                src="https://www.swiggy.com/about-us/wp-content/uploads/2024/04/03-Instamart_3_front_view_2_skycolour.png"
                alt=""
                className=" object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <MoreAbout/>
      </div>
    </div>
  );
};

export default About;
