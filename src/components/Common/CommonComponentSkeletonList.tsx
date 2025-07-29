import CommonComponentSkeleton from "./CommonComponentSkeleton";

interface CommonComponentSkeletonListProps {
    count: number;
}

const CommonComponentSkeletonList = ({count}: CommonComponentSkeletonListProps) => {
  return (
    <div>
      {new Array(count).fill(0).map((_, idx) => (
        <CommonComponentSkeleton key={idx}/>
      ))}
    </div>
  )
}

export default CommonComponentSkeletonList
