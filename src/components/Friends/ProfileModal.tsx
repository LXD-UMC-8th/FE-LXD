// src/components/Friends/ProfileModal.tsx
import { useState } from "react";
import Avatar from "../Common/Avatar";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import useFriendship from "../../hooks/queries/useFriendship";
import {
  postFriendRequest,
  postFriendAccept,
  postFriendRefuse,
} from "../../apis/friend";
import { useFriendCounts } from "../../context/FriendCountsContext";
import { useNavigate } from "react-router-dom";

interface ProfileModalProps {
  user: {
    memberId: number;            // ✅ 반드시 필요 (useFriendship 대상)
    name: string;
    username: string;
    profileImage?: string;
    // 아래 두 개는 과거 호환용(훅 결과가 우선 적용됨)
    isFriend?: boolean;
    isRequesting?: boolean;
  };
  onClose: () => void;
  onUnfriendClick: () => void;   // 친구 상태일 때 “친구” 버튼 클릭 시 모달(상위에서 처리)
  onSendRequestClick: () => void; // 요청 보낸 뒤 알림/토스트 등 상위 처리
}

const ProfileModal = ({
  user,
  onClose,
  onUnfriendClick,
  onSendRequestClick,
}: ProfileModalProps) => {
  const { language } = useLanguage();
  const t = translate[language];
  const navigate = useNavigate();

  const { incFriend, decRequests, incRequests } = useFriendCounts();

  // 친구관계 상태(friend | pending | incoming | none)
  const { state, isLoading, refetchAll } = useFriendship(user.memberId);

  const [busy, setBusy] = useState(false);

  // 과거 프롭 폴백(훅 결과 우선)
  const mergedState: "loading" | "friend" | "pending" | "incoming" | "none" =
    isLoading
      ? "loading"
      : state
        ? state
        : user.isFriend
          ? "friend"
          : user.isRequesting
            ? "pending"
            : "none";

  // 요청 보내기
  const handleSendRequest = async () => {
    if (busy) return;
    setBusy(true);
    try {
      // 낙관적 카운트 +1
      incRequests(1);
      await postFriendRequest({ receiverId: user.memberId });
      onSendRequestClick?.();
      await refetchAll();
    } catch (err: any) {
      // 409면 이미 요청 상태 → 증가 롤백
      if (err?.response?.status === 409) {
        decRequests(1);
        await refetchAll();
      } else {
        decRequests(1);
        console.error("❌ 친구 요청 실패:", err);
        alert(t.friendRequestFailed);
      }
    } finally {
      setBusy(false);
    }
  };

  // 받은 요청 수락
  const handleAccept = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await postFriendAccept(user.memberId);
      // 친구 +1, 요청 -1
      incFriend(1);
      decRequests(1);
      await refetchAll();
    } catch (err) {
      console.error("❌ 요청 수락 실패:", err);
    } finally {
      setBusy(false);
    }
  };

  // 받은 요청 거절
  const handleRefuse = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await postFriendRefuse(user.memberId);
      // 요청 -1
      decRequests(1);
      await refetchAll();
    } catch (err) {
      console.error("❌ 요청 거절 실패:", err);
    } finally {
      setBusy(false);
    }
  };

  const handleViewDiary = () => {
    navigate(`/diaries/member/${user.memberId}`); // ✅ 라우팅
  };



  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-96 p-6">
        {/* 상단 */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <Avatar
              src={user.profileImage}
              alt={`${user.name}의 프로필 이미지`}
              size="w-20 h-20"
            />
            <div>
              <div className="text-xl font-semibold text-gray-900">{user.name}</div>
              <div className="text-sm text-gray-500">@{user.username}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* 버튼 영역 (친구관계에 따라 변경) */}
        <div className="flex justify-center gap-4">
          {mergedState === "loading" ? (
            <button
              disabled
              className="min-w-[144px] py-2 rounded-lg bg-gray-100 text-gray-400 "
            >
              {t.loadingLabel}
            </button>
          ) : mergedState === "friend" ? (
            // 친구 상태 → 상위 onUnfriendClick 호출(기존 UX 유지: 상위에서 확인 모달 띄움)
            <button
              onClick={onUnfriendClick}
              disabled={busy}
              className="min-w-[144px] py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
            >
              {t.Friend}
            </button>
          ) : mergedState === "pending" ? (
            // 내가 보낸 요청 대기중
            <>
              <button
                disabled
                className="min-w-[144px] py-2 rounded-lg bg-[#EDF3FE] text-[#618BFD] text-sm font-medium cursor-not-allowed flex items-center justify-center gap-2"
              >
                <img src="/images/requestingIcon.svg" alt="요청중" className="w-5 h-5" />
                {t.pendingLabel}
              </button>
              
            </>
          ) : mergedState === "incoming" ? (
            // 받은 요청(수락/거절)
            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                onClick={handleAccept}
                disabled={busy}
                className="py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
              >
                {t.acceptButton}
              </button>
              <button
                onClick={handleRefuse}
                disabled={busy}
                className="py-2 rounded-lg bg-gray-100 text-sm text-gray-700 font-medium hover:bg-gray-200 disabled:opacity-60"
              >
                {t.refuseButton}
              </button>
            </div>
          ) : (
            // 관계 없음 → 친구 요청 보내기
            <button
              onClick={handleSendRequest}
              disabled={busy}
              className="min-w-[144px] py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
            >
              {t.sendFriendRequestButton}
            </button>
          )}

          {/* 다이어리 보기 (별도 라우팅 연결 시 교체) */}
          <button 
          onClick={handleViewDiary}
          className="min-w-[144px] py-2 rounded-lg bg-gray-100 text-sm text-gray-700 font-medium hover:bg-gray-200 cursor-pointer">
            {t.viewDiaryButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
