import { useInfiniteQuery } from "@tanstack/react-query";
import { getProvidedCorrections } from "../../apis/correctionsProvided";
import type { SavedCorrectionItem } from "../../utils/types/savedCorrection";

// 서버 응답을 화면용으로 변환
const mapToItem = (raw: any, me: any): SavedCorrectionItem => ({
  // provided 응답에는 저장 ID가 없으므로 메모 기능 비활성화 용으로 0/"" 처리
  savedCorrectionId: raw?.savedCorrectionId ?? 0,
  memo: raw?.memo ?? "",
  original: raw?.originalText ?? "",
  corrected: raw?.corrected ?? "",
  commentText: raw?.commentText ?? "",
  createdAt: raw?.createdAt ?? "",
  commentCount: raw?.commentCount ?? 0,
  likeCount: raw?.likeCount ?? 0,
  diaryId: raw?.diaryInfo?.diaryId ?? 0,
  diaryTitle: raw?.diaryInfo?.diaryTitle ?? "",
  member: {
    // 내가 작성한 교정이므로 작성자 = result.member
    memberId: me?.memberId ?? 0,
    username: me?.username ?? "",
    nickname: me?.nickname ?? "",
    profileImageUrl: me?.profileImageUrl ?? "",
  },
});

export function useProvidedCorrections() {
  return useInfiniteQuery<any, unknown, SavedCorrectionItem[], ["providedCorrections"], number>({
    queryKey: ["providedCorrections"],
    initialPageParam: 1, // 1부터 시작
    queryFn: ({ pageParam }) => getProvidedCorrections(pageParam, 10),
    getNextPageParam: (last) =>
      last?.result?.corrections?.hasNext
        ? (last?.result?.corrections?.page ?? 1) + 1
        : undefined,
    select: (data) =>
      data.pages.flatMap((p: any) => {
        const me = p?.result?.member ?? {};
        const contents = p?.result?.corrections?.contents ?? [];
        return contents.map((c: any) => mapToItem(c, me));
      }),
  });
}
