// src/hooks/mutations/useUnfriend.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFriend } from "../../apis/friend";
import { FRIENDS_QK, FRIEND_REQUESTS_QK } from "../queries/useFriendship";

export default function useUnfriend() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (friendMemberId: number) => {
      const res = await deleteFriend(friendMemberId);
      if (!res.ok) {
        const err: any = new Error(`Unfriend failed (status=${res.status})`);
        err.status = res.status;
        err.response = res.data;
        throw err;
      }
      return { memberId: friendMemberId };
    },
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: FRIENDS_QK }),
        qc.invalidateQueries({ queryKey: FRIEND_REQUESTS_QK }),
      ]);
    },
    retry: false,
    networkMode: "always",
  });
}
