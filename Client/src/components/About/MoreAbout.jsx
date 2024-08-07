import { useRef, useState } from "react";

const MoreAbout = () => {
  const center = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  };

  const section1 = useRef();
  const section2 = useRef();
  const section3 = useRef();
  const section4 = useRef();

  const [visibleSection, setVisibleSection] = useState("MISSION");

  const scrollHandler = (elmRef, sectionName) => {
    setVisibleSection(sectionName);
    window.scrollTo({ top: elmRef.current.offsetTop, behavior: "smooth" });
  };

  return (
    <div>
      <header>
        <div className="header">
          <div className="cont px-[250px]">
            <div className="links flex justify-evenly align-middle">
              <div className="mission py-5">
                <div className="linkborder border-2 rounded-full cursor-pointer border-black dark:border-white">
                  <h1
                    onClick={() => scrollHandler(section1, "MISSION")}
                    className="py-4 px-10"
                  >
                    MISSION
                  </h1>
                </div>
              </div>

              <div className="vision py-5">
                <div className="linkborder border-2 rounded-full cursor-pointer  border-black dark:border-white">
                  <h1
                    onClick={() => scrollHandler(section2, "VISION")}
                    className="py-4 px-10"
                  >
                    VISION
                  </h1>
                </div>
              </div>

              <div className="values py-5">
                <div className="linkborder border-2 rounded-full cursor-pointer  border-black dark:border-white">
                  <h1
                    onClick={() => scrollHandler(section3, "VALUES")}
                    className="py-4 px-10"
                  >
                    VALUES
                  </h1>
                </div>
              </div>

              <div className="walkthrough py-5">
                <div className="linkborder border-2 rounded-full cursor-pointer  border-black dark:border-white">
                  <h1
                    onClick={() => scrollHandler(section4, "WALKTHROUGH")}
                    className="py-4 px-10"
                  >
                    WALKTHROUGH
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div>
        {visibleSection === "MISSION" && (
          <div
            ref={section1}
            style={{
              ...center,
            }}
          >
            <div className="cont">
              <div className="flex-col py-20 px-40">
                <div className=" flex justify-center align-middle">
                  <div className="firstDiv flex py-10">
                    <div className="imgDiv">
                      <img
                        src="https://www.swiggy.com/about-us/wp-content/uploads/2024/04/Group-1000006479.png"
                        alt=""
                      />
                    </div>

                    <div className="textDiv">
                      <div className="heading px-10">
                        <h1 className=" font-semibold text-[30px] text-center my-2">
                          Mission
                        </h1>
                        <h4 className="text-[20px]">
                          Our mission is to elevate the quality of life of the
                          urban consumer by offering unparalleled convenience.
                          Convenience is what makes us tick. It’s what makes us
                          get out of bed and say, “Let’s do this.”
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" flex justify-center align-middle">
                  <div className="firstDiv flex py-10 flex-row-reverse">
                    <div className="imgDiv">
                      <img
                        src="https://www.swiggy.com/about-us/wp-content/uploads/2024/04/about-img1-new.png"
                        alt=""
                      />
                    </div>

                    <div className="textDiv">
                      <div className="heading px-10">
                        <h1 className=" font-semibold text-[30px] text-center my-2">
                          Industry pioneer
                        </h1>
                        <h4 className=" text-[20px]">
                          Being among the first few entrants, Swiggy has
                          successfully pioneered the hyperlocal commerce
                          industry in India, launching Food Delivery in 2014 and
                          Quick Commerce in 2020. Due to the pioneering status
                          of Swiggy, it is well-recognised as a leader in
                          innovation in hyperlocal commerce and as a brand
                          synonymous with the categories it is present in.
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {visibleSection === "VISION" && (
          <div
            ref={section2}
            style={{
              ...center,
            }}
          >
            <div className="cont">
              <div className="flex-col py-20 px-40">
                <div className=" flex justify-center align-middle">
                  <div className="firstDiv flex py-10 flex-row-reverse">
                    <div className="imgDiv">
                      <img
                        src="https://www.swiggy.com/about-us/wp-content/uploads/2024/04/Group-1000006479.png"
                        alt=""
                      />
                    </div>

                    <div className="textDiv">
                      <div className="heading px-10">
                        <h1 className=" font-semibold text-[30px] text-center my-2">
                          Industry pioneer
                        </h1>
                        <h4 className=" text-[20px]">
                          Being among the first few entrants, Swiggy has
                          successfully pioneered the hyperlocal commerce
                          industry in India, launching Food Delivery in 2014 and
                          Quick Commerce in 2020. Due to the pioneering status
                          of Swiggy, it is well-recognised as a leader in
                          innovation in hyperlocal commerce and as a brand
                          synonymous with the categories it is present in.
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {visibleSection === "VALUES" && (
          <div
            ref={section3}
            style={{
              ...center,
            }}
          >
            <div className="cont">
              <div className="flex-col py-20 px-40">
                <div className=" flex justify-center align-middle">
                  <div className="firstDiv flex py-10 flex-row-reverse">
                    <div className="imgDiv">
                      <img
                        src="https://www.swiggy.com/about-us/wp-content/uploads/2024/04/Group-1000006479.png"
                        alt=""
                      />
                    </div>

                    <div className="textDiv">
                      <div className="heading px-10">
                        <h1 className=" font-semibold text-[30px] text-center my-2">
                          Values
                        </h1>
                        <h4 className=" text-[20px]">
                          Our actions are strongly defined by the Swiggy values.
                          Through ups, downs, and everything in between;
                          Swiggsters put these values into practice in their
                          everyday ways of working. Read on to get a taste of
                          how Swiggsters live and breathe these values and how
                          it forms the backbone of our culture.
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {visibleSection === "WALKTHROUGH" && (
          <div
            ref={section4}
            style={{
              ...center,
            }}
          >
            <div className="cont">
              <div className="flex-col py-10 px-40">
                <div className=" flex justify-center align-middle">
                  <div className="firstDiv flex py-10 flex-row-reverse">
                    <div className="imgDiv">
                      <img
                        src="https://www.swiggy.com/about-us/wp-content/uploads/2024/04/Group-1000006479.png"
                        alt=""
                      />
                    </div>

                    <div className="textDiv">
                      <div className="heading py-10 px-20">
                        <h1 className=" font-semibold text-[30px] text-center my-2">
                          Walkthrough
                        </h1>
                        <h4 className=" text-[20px]">
                          Old love with young love feels. Watch the story of two
                          empty nesters, Shailja and Pradeep, as they navigate
                          through love, life, food, and a badminton court
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreAbout;
