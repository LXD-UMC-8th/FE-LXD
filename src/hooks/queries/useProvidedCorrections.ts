import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { getProvidedCorrections } from "../../apis/correctionsProvided";
import type {
  getCorrectionProvidedResponseDTO,
  ProvidedProps,
  SavedCorrectionItem,
} from "../../utils/types/savedCorrection";

// 서버 응답을 화면용으로 변환
const mapToItem = (item: ProvidedProps) => ({
  // provided 응답에는 저장 ID가 없으므로 메모 기능 비활성화 용으로 0/"" 처리
  savedCorrectionId: 0,
  memo: "",
  original: item?.originalText ?? "",
  corrected: item?.corrected ?? "",
  commentText: item?.commentText ?? "",
  createdAt: item?.createdAt ?? "",
  commentCount: item?.commentCount ?? 0,
  likeCount: item?.likeCount ?? 0,
  diaryInfo: {
    diaryId: item?.diaryInfo?.diaryId ?? 0,
    diaryTitle: item?.diaryInfo?.diaryTitle ?? "",
  },
  member: {
    // 내가 작성한 교정이므로 작성자 = result.member
    memberId: 0,
    username: "",
    nickname: "",
    profileImageUrl: "",
  },
});

export function useProvidedCorrections() {
  return useInfiniteQuery<
    getCorrectionProvidedResponseDTO,
    unknown,
    SavedCorrectionItem[],
    ["providedCorrections"],
    number
  >({
    queryKey: ["providedCorrections"],
    initialPageParam: 1, // 1부터 시작
    queryFn: ({ pageParam }) => getProvidedCorrections(pageParam, 10),
    getNextPageParam: (last) =>
      last?.result?.corrections?.hasNext
        ? (last?.result?.corrections?.page ?? 1) + 1
        : undefined,
    select: (data: InfiniteData<getCorrectionProvidedResponseDTO>) =>
      data.pages.flatMap((p: getCorrectionProvidedResponseDTO) =>
        p.result.corrections.contents.map(
          (item: ProvidedProps) => mapToItem(item) // You should define mapToItem to convert DTO to SavedCorrectionItem
        )
      ),
  });
}
