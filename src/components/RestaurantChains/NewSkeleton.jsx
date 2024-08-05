import { SkeletonCard } from "./SkeletonCard";
const NewSkeleton = () => {
  return (
    <div className=" flex flex-row gap-8 ml-7 mt-12">
    {[...Array(7)].map((_, index) => (
      <SkeletonCard key={index} />
    ))}
    </div>
  );
};

export default NewSkeleton;
