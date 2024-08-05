import React, { useState, useEffect } from "react";
import { SkeletonCard } from "./SkeletonCard";

const NewSkeleton = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 550);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 550);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const skeletonCount = isSmallScreen ? 2 : 7;

  return (
    <div className="flex flex-row gap-8 ml-7 mt-12">
      {[...Array(skeletonCount)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default NewSkeleton;
