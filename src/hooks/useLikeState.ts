import { useQueryClient } from "@tanstack/react-query";

type LikeState = Record<number, { liked: boolean; likeCount: number }>;

export function useLikeState() {
  const qc = useQueryClient();

  const get = (id: number, fallback: { liked: boolean; likeCount: number }) => {
    const map = qc.getQueryData<LikeState>(["likeState"]) || {};
    return map[id] ?? fallback;
  };

  const set = (id: number, next: { liked: boolean; likeCount: number }) => {
    qc.setQueryData<LikeState>(["likeState"], (prev) => ({ ...(prev || {}), [id]: next }));
  };

  const remove = (id: number) => {
    qc.setQueryData<LikeState>(["likeState"], (prev) => {
      const copy = { ...(prev || {}) };
      delete copy[id];
      return copy;
    });
  };

  return { get, set, remove };
}
