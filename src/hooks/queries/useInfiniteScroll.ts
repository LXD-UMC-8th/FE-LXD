import {
  type QueryKey,
  type QueryFunctionContext,
  useInfiniteQuery,
} from "@tanstack/react-query";

export const useInfiniteScroll = ({
  queryKey,
  queryFn,
  getNextPageParam,
}: {
  queryKey: QueryKey;
  queryFn: (context: QueryFunctionContext) => Promise<any>;
  getNextPageParam: (lastPage: any) => any; // Ensure type definition for getNextPageParam
}) => {
  return useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1, // Example initial page parameter
    getNextPageParam, // Use the passed getNextPageParam function directly
  });
};
