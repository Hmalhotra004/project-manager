import { Skeleton } from "@/components/ui/skeleton";

const SkeletonProject = () => {
  return (
    <div className="flex items-center">
      <div className="space-y-4">
        <Skeleton className="h-5 w-[240px] bg-stone-400 rounded-lg" />
        <Skeleton className="h-5 w-[240px] bg-stone-400 rounded-lg" />
        <Skeleton className="h-5 w-[240px] bg-stone-400 rounded-lg" />
      </div>
    </div>
  );
};

export default SkeletonProject;
