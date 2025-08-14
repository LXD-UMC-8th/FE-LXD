import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchSavedMemo, deleteSavedMemo } from "../../apis/correctionsSaved";
import type { SavedCorrectionItem } from "../../utils/types/savedCorrection";

type UpsertVars = { savedCorrectionId: number; memo: string };

export function useUpsertSavedMemo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (v: UpsertVars) => {
      return v.memo.trim()
        ? patchSavedMemo(v) // 이미 있으면 수정
        : deleteSavedMemo(v.savedCorrectionId); // 빈 문자열이면 삭제(선택)
    },
    onMutate: async ({ savedCorrectionId, memo }) => {
      await qc.cancelQueries({ queryKey: ["savedCorrections"] });
      const previous = qc.getQueryData<SavedCorrectionItem[]>([
        "savedCorrections",
      ]);

      qc.setQueryData<SavedCorrectionItem[]>(["savedCorrections"], (old) =>
        (old ?? []).map((it) =>
          it.savedCorrectionId === savedCorrectionId ? { ...it, memo } : it
        )
      );
      return { previous };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.previous) qc.setQueryData(["savedCorrections"], ctx.previous);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["savedCorrections"] });
    },
  });
}

export function useDeleteSavedMemo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteSavedMemo(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["savedCorrections"] });
      const previous = qc.getQueryData<SavedCorrectionItem[]>([
        "savedCorrections",
      ]);

      qc.setQueryData<SavedCorrectionItem[]>(["savedCorrections"], (old) =>
        (old ?? []).map((it) =>
          it.savedCorrectionId === id ? { ...it, memo: "" } : it
        )
      );
      return { previous };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.previous) qc.setQueryData(["savedCorrections"], ctx.previous);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["savedCorrections"] });
    },
  });
}
