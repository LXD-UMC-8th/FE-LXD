// src/components/Friends/ProfileView.tsx
import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import Avatar from "../Common/Avatar";
import AlertModal from "../Common/AlertModal";
import CommonComponentInDiaryNFeed from "../Common/CommonComponentInDiaryNFeed";
import CommonComponentSkeleton from "../Common/CommonComponentSkeleton";

import { addRecentSearch } from "../../utils/types/recentSearch";
import { postFriendRequest } from "../../apis/friend";
import { getUserDiaries, getDiaryDetail } from "../../apis/diary";
import type { getDiariesResponseDTO, diaries } from "../../utils/types/diary";

import useFriendship from "../../hooks/queries/useFriendship";
import useUnfriend from "../../hooks/mutations/useUnfriend";

import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { useFriendCounts } from "../../context/FriendCountsContext";

interface ProfileViewProps {
  user: {
    name: string;
    username: string;
    image?: string;
    isFriend: boolean; // (호환용) 훅 결과가 우선
    id: number;        // ✅ 서버 memberId와 동일
  };
  onClose: () => void;
  onUnfriendClick: () => void; // (구버전 호환용)
  onAvatarClick: () => void;
  isRequesting: boolean;       // (호환용)
  onSendRequestClick: () => void;
}

const ProfileView = ({
  user,
  onClose,
  onAvatarClick,
  isRequesting,
  onSendRequestClick,
}: ProfileViewProps) => {
  const { language } = useLanguage();
  const t = translate[language];
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { incRequests } = useFriendCounts();

  // 친구관계 상태(friend | pending | incoming | none)
  const { state, isLoading, refetchAll } = useFriendship(user.id);

  // 내부 확인 모달/버튼 로딩
  const [showConfirm, setShowConfirm] = useState(false);
  const [btnBusy, setBtnBusy] = useState(false);

  const { mutateAsync: unfriend } = useUnfriend();

  // 훅 결과 우선, 프롭은 폴백
  const mergedState =
    isLoading
      ? "loading"
      : state === "friend" || state === "pending" || state === "incoming" || state === "none"
      ? state
      : user.isFriend
      ? "friend"
      : isRequesting
      ? "pending"
      : "none";

  useEffect(() => {
    if (user?.username) addRecentSearch(user.username);
  }, [user?.username]);

  const handleSendRequest = async () => {
    incRequests(1);
    try {
      await postFriendRequest({ receiverId: user.id });
      onSendRequestClick?.();
      await refetchAll();
    } catch (err: any) {
      if (err?.response?.status === 409) {
        await refetchAll();
        return;
      }
      console.error("❌ 친구 요청 실패:", err);
      alert(t.friendRequestFailed);
    }
  };

  // 다이어리 목록(최근 일기) 무한스크롤
  const {
    data: diaryPages,
    isFetching: diariesFetching,
    isError: diariesError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["userDiaries", user.id],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getUserDiaries(user.id, pageParam as number),
    getNextPageParam: (last: getDiariesResponseDTO) =>
      last?.result?.hasNext ? (last.result.page ?? 1) + 1 : undefined,
    staleTime: 30_000,
  });

  const items: diaries[] = useMemo(
    () => diaryPages?.pages.flatMap((p) => p?.result?.diaries ?? []) ?? [],
    [diaryPages]
  );

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !diariesFetching) fetchNextPage();
  }, [inView, hasNextPage, diariesFetching, fetchNextPage]);

  const openDiary = async (diaryId?: number) => {
    if (!diaryId) return;
    await qc.prefetchQuery({
      queryKey: ["diaryDetail", diaryId],
      queryFn: () => getDiaryDetail(diaryId),
      staleTime: 30_000,
    });
    navigate(`/feed/${diaryId}`);
  };

  const handleViewDiaryList = () => navigate(`/diaries/member/${user.id}`);

  // 다이어리 보러가기 (상단 버튼)
  const handleViewDiary = () => handleViewDiaryList();

  const handleConfirmUnfriend = async () => {
    try {
      setBtnBusy(true);
      await unfriend(user.id);
      await refetchAll();
      setShowConfirm(false);
    } catch (err) {
      console.error("❌ 친구 삭제 실패:", err);
      alert("친구 삭제에 실패했어요.");
    } finally {
      setBtnBusy(false);
    }
  };

  // 안전 라벨
  const recentTitle = language === "KO" ? "최근 일기" : "Recent diaries";
  const viewMoreLabel = language === "KO" ? "더보기" : "View more";
  const cannotLoad =
    t.CannotLoadList ?? (language === "KO" ? "목록을 불러올 수 없어요." : "Cannot load list.");

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-2xl shadow overflow-hidden">
      {/* 상단 */}
      <div className="p-8 pb-6 flex justify-between items-start">
        <div className="flex items-center gap-6">
          <Avatar
            src={user.image}
            alt={`${user.name} profile`}
            size="w-24 h-24"
            className="border border-gray-200 cursor-pointer"
            onClick={onAvatarClick}
          />
          <div>
            <div className="text-2xl font-bold text-gray-900">{user.name}</div>
            <div className="text-base text-gray-500">@{user.username}</div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 cursor-pointer" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      {/* 액션 버튼 */}
      <div className="px-8 mb-6 flex gap-4">
        {mergedState === "loading" ? (
          <button className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-400" disabled>
            {t.loadingLabel}
          </button>
        ) : mergedState === "friend" ? (
          <button
            className="flex-1 py-3 rounded-xl bg-[#3461F4] text-white text-base font-semibold hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
            onClick={() => setShowConfirm(true)}
            disabled={btnBusy}
          >
            {t.Friend}
          </button>
        ) : mergedState === "pending" ? (
          <button
            disabled
            className="flex-1 py-3 rounded-xl bg-[#EDF3FE] text-[#618BFD] text-base font-semibold cursor-not-allowed flex items-center justify-center gap-2"
          >
            <img src="/images/requestingIcon.svg" alt="요청중" className="w-5 h-5" />
            {t.pendingLabel}
          </button>
        ) : mergedState === "incoming" ? (
          <div className="flex-1 grid grid-cols-2 gap-3">
            <button className="py-3 rounded-xl bg-[#3461F4] text-white font-semibold">
              {t.acceptButton}
            </button>
            <button className="py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold">
              {t.refuseButton}
            </button>
          </div>
        ) : (
          <button
            onClick={handleSendRequest}
            className="flex-1 py-3 rounded-xl bg-[#3461F4] text-white text-base font-semibold hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
            disabled={btnBusy}
          >
            {t.sendFriendRequestButton}
          </button>
        )}

        {/* 다이어리 보러가기 */}
        <button
          onClick={handleViewDiary}
          className="flex-1 py-3 rounded-xl bg-[#EDF3FE] text-[#618BFD] text-base font-semibold hover:bg-blue-100 cursor-pointer"
        >
          {t.viewDiaryButton}
        </button>
      </div>

      {/* ✅ 최근 일기 프리뷰 (프로필 카드와 동일 폭으로 제한) */}
      <div className="px-8 pb-8">
        {/* ⬇️ 이 래퍼가 상단과 같은 내부 폭을 보장 (필요시 값 600~700 사이 조절) */}
        <div className="mx-auto w-full max-w-[640px]">
          {/* 헤더 */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-3">
            <h3 className="text-base font-semibold text-gray-900">{recentTitle}</h3>
            <button
              onClick={handleViewDiaryList}
              className="text-sm text-[#4170FE] hover:underline cursor-pointer"
            >
              {viewMoreLabel}
            </button>
          </div>

          {/* 리스트 (카드 폭 = 래퍼 폭) */}
          <div className="space-y-3">
            {items.map((d) => (
              <div
                key={d.diaryId}
                role="button"
                tabIndex={0}
                onClick={() => openDiary(d.diaryId)}
                onKeyDown={(e) => e.key === "Enter" && openDiary(d.diaryId)}
                title={`Open diary ${d.diaryId}`}
                className="
                  rounded-2xl border border-gray-200 bg-white px-5 py-4
                  hover:shadow-sm transition-shadow
                  
                "
              >
                <CommonComponentInDiaryNFeed props={d} variant="friendPreview" rounded={true} />
              </div>
            ))}

            {diariesFetching && (
              <div className="space-y-3">
                <CommonComponentSkeleton />
                <CommonComponentSkeleton />
              </div>
            )}

            {diariesError && (
              <div className="text-gray-500 text-sm mt-2">{cannotLoad}</div>
            )}

            {/* 무한스크롤 센티넬 */}
            <div ref={ref} />
          </div>
        </div>
      </div>

      {/* 친구 취소 확인 모달 */}
      {showConfirm && (
        <AlertModal
          onClose={() => setShowConfirm(false)}
          onConfirm={handleConfirmUnfriend}
          title={t.unfriendConfirmTitle.replace("{name}", user.name)}
          confirmText={t.unfriendConfirmAction2}
          alertMessage={t.unfriendDoneToast2}
        />
      )}
    </div>
  );
};

export default ProfileView;
