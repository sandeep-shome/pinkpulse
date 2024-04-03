import { Skeleton } from "../ui";

const PeriodBoxSkeleton = () => {
  return (
    <div className="w-full my-4 bg-red-100 px-2 py-3 rounded">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <div className="flex items-center gap-5">
          <div className="w-8 h-8 rounded-full">
            <Skeleton className={"w-full rounded-full h-full"} />
          </div>
        </div>
      </div>
      <div className="w-full mt-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-full mt-3 mb-2" />
        <Skeleton className="h-4 w-[70%] mb-2" />
        <Skeleton className="h-4 w-[30%]" />
      </div>
    </div>
  );
};

export default PeriodBoxSkeleton;
