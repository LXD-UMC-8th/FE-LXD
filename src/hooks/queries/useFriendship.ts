// src/hooks/queries/useFriendship.ts
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFriends, getFriendRequests } from "../../apis/friend";
import type {
  FriendListResponseDTO,
  FriendRequestListResponseDTO,
} from "../../utils/types/friend";

type FriendshipState = "friend" | "pending" | "incoming" | "none";

// 응답에서 배열 꺼내는 helper (undefined 안전)
const pick = <T,>(arr: T[] | undefined | null) => (Array.isArray(arr) ? arr : []);

const FRIEND_FETCH_SIZE = 100; // 첫 페이지만 크게 가져와도 충분하면 100 정도로

export default function useFriendship(targetMemberId: number) {
  // 1) 내 친구 목록
  const friendsQ = useQuery({
    queryKey: ["friends", 1, FRIEND_FETCH_SIZE],
    queryFn: () => getFriends(1, FRIEND_FETCH_SIZE),
    // 필요한 부분만 select 해서 컴포넌트 렌더 최소화
    select: (res: FriendListResponseDTO) =>
      pick(res?.result?.friends?.contents).map((m) => ({
        memberId: m.memberId,
      })),
  });

  // 2) 내 친구 요청 목록 (보낸/받은)
  const requestsQ = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
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
    const isPendingSent = sent.some((s) => Number(s.memberId) === uid);        // 내가 보낸 요청 → "요청중"
    const isPendingReceived = received.some((r) => Number(r.memberId) === uid); // 내가 받은 요청 → "수락/거절 가능"

    let state: FriendshipState = "none";
    if (isFriend) state = "friend";
    else if (isPendingSent) state = "pending";
    else if (isPendingReceived) state = "incoming"; // 필요 없으면 이 분기 삭제해도 됨

    return { state, isFriend, isPendingSent, isPendingReceived };
  }, [friendsQ.data, requestsQ.data, targetMemberId]);

  const isLoading = friendsQ.isLoading || requestsQ.isLoading;
  const refetchAll = async () => {
    await Promise.all([friendsQ.refetch(), requestsQ.refetch()]);
  };

  return {
    state,                 // "friend" | "pending" | "incoming" | "none"
    isFriend,
    isPendingSent,         // 내가 보낸 요청 여부
    isPendingReceived,     // 내가 받은 요청 여부
    isLoading,
    refetchAll,
  };
}
