// src/apis/correctionsProvided.ts
import type { ProvidedCorrectionsResponseDTO } from "../utils/types/savedCorrection";
import { axiosInstance } from "./axios";

const pick = (o: any, keys: string[]) =>
  keys.map((k) => o?.[k]).find((v) => v !== undefined && v !== null);

const pickDeep = (o: any, paths: string[][]) => {
  for (const path of paths) {
    let cur = o;
    let ok = true;
    for (const k of path) {
      if (cur && k in cur) cur = cur[k];
      else { ok = false; break; }
    }
    if (ok && cur != null) return cur;
  }
  return undefined;
};

// 1부터 시작 (스웨거 예시 기준)
export const getProvidedCorrections = async (
  pageParam: number,
  size = 10
): Promise<ProvidedCorrectionsResponseDTO> => {
  const res = await axiosInstance.get<ProvidedCorrectionsResponseDTO>(
    "/corrections/provided",
    { params: { page: pageParam, size } }
  );

  const dto = res.data;

  // 경로 방어
  const pager: any =
    (dto as any)?.result?.corrections ??
    (dto as any)?.result?.contents ?? {};
  const contents: any[] = Array.isArray(pager.contents) ? pager.contents : [];

  // ✅ 스웨거 스키마 반영 + 불일치 대비 정규화
  const normalized = contents.map((it: any) => {
    const diaryTitle =
      it?.diaryInfo?.diaryTitle ??
      pick(it, ["diaryTitle", "title", "diaryName"]) ??
      pickDeep(it, [
        ["diary", "title"],
        ["targetDiary", "title"],
        ["target", "title"],
        ["diaryInfo", "title"],
        ["sourceDiary", "title"],
        ["post", "title"],
        ["entry", "title"],
        ["content", "title"],
      ]) ?? "";

    const diaryId =
      it?.diaryInfo?.diaryId ??
      pick(it, ["diaryId", "postId", "entryId"]) ??
      pickDeep(it, [
        ["diary", "id"],
        ["targetDiary", "id"],
        ["target", "id"],
        ["diaryInfo", "id"],
        ["sourceDiary", "id"],
        ["post", "id"],
        ["entry", "id"],
      ]);

    const createdAt =
      pick(it, ["createdAt", "providedAt", "updatedAt", "createdDate"]) ??
      it?.diaryInfo?.diaryCreatedAt ?? "";

    const member =
      pick(it, ["member", "receiver", "writer", "owner", "author", "user"]) ?? {};

    const likeCount =
      typeof it.likeCount === "number" ? it.likeCount : (it.likes ?? 0);

    const liked = Boolean(pick(it, ["liked", "isLiked", "hasLiked"]) ?? false);

    // 본문 원문 키 통일(제공 탭은 originalText 로 옴)
    const original = it.original ?? it.originalText;

    return {
      ...it,
      diaryTitle,
      diaryId,
      createdAt,
      member,
      likeCount,
      liked,
      original,
    };
  });

  // 원래 DTO 모양 유지하면서 contents만 교체
  const next: any = {
    ...dto,
    result: {
      ...dto.result,
      corrections: {
        ...pager,
        contents: normalized,
      },
    },
  };

  return next as ProvidedCorrectionsResponseDTO;
};
