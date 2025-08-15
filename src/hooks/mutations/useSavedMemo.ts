import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchSavedMemo, deleteSavedMemo, postSavedMemo } from "../../apis/correctionsSaved";

// 어떤 캐시 모양이 와도 memo만 안전하게 패치
function patchSavedCorrectionsCache(
  qc: ReturnType<typeof useQueryClient>,
  savedCorrectionId: number,
  nextMemo: string
) {
  qc.setQueryData(["savedCorrections"], (old: any) => {
    if (!old) return old;

    if (Array.isArray(old)) {
      return old.map((it: any) =>
        it?.savedCorrectionId === savedCorrectionId ? { ...it, memo: nextMemo } : it
      );
    }

    if (old?.pages && Array.isArray(old.pages)) {
      return {
        ...old,
        pages: old.pages.map((page: any) => {
          if (Array.isArray(page)) {
            return page.map((it: any) =>
              it?.savedCorrectionId === savedCorrectionId ? { ...it, memo: nextMemo } : it
            );
          }
          if (page?.result?.savedCorrections?.contents) {
            return {
              ...page,
              result: {
                ...page.result,
                savedCorrections: {
                  ...page.result.savedCorrections,
                  contents: page.result.savedCorrections.contents.map((c: any) =>
                    c?.savedCorrectionId === savedCorrectionId ? { ...c, memo: nextMemo } : c
                  ),
                },
              },
            };
          }
          return page;
        }),
      };
    }

    return old;
  });
}

/** 메모 생성/수정(업서트) */
export function useUpsertSavedMemo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (v: { savedCorrectionId: number; memo: string; hadMemo: boolean }) => {
      const payload = { savedCorrectionId: v.savedCorrectionId, memo: v.memo.trim() };
      return v.hadMemo ? patchSavedMemo(payload) : postSavedMemo(payload);
    },
    onMutate: async ({ savedCorrectionId, memo }) => {
      await qc.cancelQueries({ queryKey: ["savedCorrections"] });
      patchSavedCorrectionsCache(qc, savedCorrectionId, memo);
      return { savedCorrectionId, memo };
    },
    // ⬇️ ctx 제거 (미사용 인자)
    onError: () => {
      qc.invalidateQueries({ queryKey: ["savedCorrections"] });
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["savedCorrections"] });
    },
  });
}

/** 메모 삭제 */
export function useDeleteSavedMemo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (savedCorrectionId: number) => deleteSavedMemo(savedCorrectionId),
    onMutate: async (savedCorrectionId) => {
      await qc.cancelQueries({ queryKey: ["savedCorrections"] });
      patchSavedCorrectionsCache(qc, savedCorrectionId, "");
      return { savedCorrectionId };
    },
    // ⬇️ ctx 제거 (미사용 인자)
    onError: () => {
      qc.invalidateQueries({ queryKey: ["savedCorrections"] });
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["savedCorrections"] });
    },
  });
}
