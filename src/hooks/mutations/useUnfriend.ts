// src/hooks/mutations/useUnfriend.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFriendSmart } from "../../apis/friend";
import { FRIENDS_QK, FRIEND_REQUESTS_QK } from "../queries/useFriendship";

type Params = { memberId: number; friendId?: number };

export default function useUnfriend() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (params: Params) => deleteFriendSmart(params),
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: FRIENDS_QK }),
        qc.invalidateQueries({ queryKey: FRIEND_REQUESTS_QK }),
      ]);
    },
  });
}
