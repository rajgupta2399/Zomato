import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonRest() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[250px] w-[220px]" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px] " />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  );
}

export function SkeletonRestContainer(){
  return(
    <div className="flex flex-row flex-wrap max-w-[1200px] mx-auto gap-6 mt-20">
    {[...Array(20)].map((_, index) => (
      <SkeletonRest key={index} />
    ))}
    </div>
  )
}
