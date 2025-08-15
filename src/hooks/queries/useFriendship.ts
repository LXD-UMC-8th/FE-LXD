// src/hooks/queries/useFriendship.ts
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFriends, getFriendRequests } from "../../apis/friend";
import type {
  FriendListResponseDTO,
  FriendRequestListResponseDTO,
} from "../../utils/types/friend";
import { QUERY_KEY } from "../../constants/key";

type FriendshipState = "friend" | "pending" | "incoming" | "none";

// undefined 안전 배열 헬퍼
const pick = <T>(arr: T[] | undefined | null) =>
  Array.isArray(arr) ? arr : [];

// 환경변수 안전하게 읽기 (CRA/Vite 모두 대응)
const FRIEND_FETCH_SIZE: number = Number(
  // Vite

  (typeof import.meta !== "undefined" &&
    (import.meta as any)?.env?.VITE_FRIEND_FETCH_SIZE) ??
    // CRA
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any)?.process?.env?.REACT_APP_FRIEND_FETCH_SIZE ??
    100
);

export default function useFriendship(targetMemberId: number) {
  // 1) 내 친구 목록
  const friendsQ = useQuery({
    queryKey: [QUERY_KEY.friends, 1, FRIEND_FETCH_SIZE] as const,
    queryFn: () => getFriends(1, FRIEND_FETCH_SIZE),
    staleTime: 30_000,
    select: (res: FriendListResponseDTO) =>
      pick(res?.result?.friends?.contents).map((m) => ({
        memberId: m.memberId,
      })),
  });

  // 2) 보낸/받은 친구요청
  const requestsQ = useQuery({
    queryKey: [QUERY_KEY.friendRequests] as const,
    queryFn: getFriendRequests,
    staleTime: 30_000,
    select: (res: FriendRequestListResponseDTO) => ({
      sent: pick(res?.result?.sentRequests?.contents).map((m) => ({
        memberId: m.memberId,
      })),
      received: pick(res?.result?.receivedRequests?.contents).map((m) => ({
        memberId: m.memberId,
      })),
    }),
  });

  // 3) 상태 계산
  const { state, isFriend, isPendingSent, isPendingReceived } = useMemo(() => {
    const uid = Number(targetMemberId);

    const friends = friendsQ.data ?? [];
    const sent = requestsQ.data?.sent ?? [];
    const received = requestsQ.data?.received ?? [];

    const isFriend = friends.some((f) => Number(f.memberId) === uid);
    const isPendingSent = sent.some((s) => Number(s.memberId) === uid); // 내가 보낸 요청
    const isPendingReceived = received.some((r) => Number(r.memberId) === uid); // 내가 받은 요청

    let state: FriendshipState = "none";
    if (isFriend) state = "friend";
    else if (isPendingSent) state = "pending";
    else if (isPendingReceived) state = "incoming";

    return { state, isFriend, isPendingSent, isPendingReceived };
  }, [friendsQ.data, requestsQ.data, targetMemberId]);

  // ✅ v5 호환: isPending 사용
  const isLoading = friendsQ.isPending || requestsQ.isPending;

  const refetchAll = async () => {
    await Promise.all([friendsQ.refetch(), requestsQ.refetch()]);
  };

  return {
    state, // "friend" | "pending" | "incoming" | "none"
    isFriend,
    isPendingSent,
    isPendingReceived,
    isLoading, // 컴포넌트에선 그대로 사용 가능
    refetchAll,
  };
}
