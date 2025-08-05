import {
  type QueryKey,
  type QueryFunctionContext,
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";

export const useInfiniteScroll = <TData, TPageParam>({
  queryKey,
  queryFn,
  getNextPageParam,
}: {
  queryKey: QueryKey;
  queryFn: (context: QueryFunctionContext) => Promise<TData>;
  getNextPageParam: (
    lastPage: TData,
    allPages: TData[],
  ) => TPageParam | undefined; // Ensure type definition for getNextPageParam
}) => {
  return useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam, // Use the passed getNextPageParam function directly
    initialPageParam: 1 as TPageParam,
  });
};
