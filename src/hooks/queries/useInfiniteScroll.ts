import { Query, useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteScroll = ({
  queryKey,
  queryFn,
}: {
  queryKey: QueryKey;
  queryFn: (context: QueryFunctionContext) => Promise<any>;
}) => {
  return useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1, // Example initial page parameter
  });
};
