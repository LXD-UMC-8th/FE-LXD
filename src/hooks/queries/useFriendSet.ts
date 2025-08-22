import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../../apis/friend";
import { FRIENDS_QK } from "./useFriendship";
import type { FriendListResponseDTO } from "../../utils/types/friend";

const pick = <T,>(arr: T[] | undefined | null) => (Array.isArray(arr) ? arr : []);

const FRIEND_FETCH_SIZE: number = Number(
  (typeof import.meta !== "undefined" && (import.meta as any)?.env?.VITE_FRIEND_FETCH_SIZE) ??
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any)?.process?.env?.REACT_APP_FRIEND_FETCH_SIZE ??
    100
);

export function useFriendSet() {
  const q = useQuery({
    queryKey: FRIENDS_QK,
    queryFn: () => getFriends(1, FRIEND_FETCH_SIZE),
    staleTime: 30_000,
    select: (res: FriendListResponseDTO) => {
      const ids = pick(res?.result?.friends?.contents).map((m) => Number(m.memberId)).filter(Boolean);
      return new Set<number>(ids);
    },
  });

  const friendSet = q.data ?? new Set<number>();
  return { friendSet, isLoading: q.isPending, isError: q.isError, refetch: q.refetch };
}
