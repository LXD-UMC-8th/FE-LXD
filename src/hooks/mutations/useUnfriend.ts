// src/hooks/mutations/useUnfriend.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFriend } from "../../apis/friend";
import { FRIENDS_QK, FRIEND_REQUESTS_QK } from "../queries/useFriendship";

export default function useUnfriend() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (friendMemberId: number) => deleteFriend(friendMemberId),
    onSuccess: async () => {
      // ✅ 친구/요청 관련 캐시 무효화 → 훅들이 최신 상태로 계산
      await Promise.all([
        qc.invalidateQueries({ queryKey: FRIENDS_QK }),
        qc.invalidateQueries({ queryKey: FRIEND_REQUESTS_QK }),
      ]);
    },
  });
}
