import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Avatar from "../Common/Avatar";
import AlertModal from "../Common/AlertModal"; // ✅ 확인 모달 추가
import { addRecentSearch } from "../../utils/types/recentSearch";
import { postFriendRequest } from "../../apis/friend";
import useFriendship from "../../hooks/queries/useFriendship";
import useUnfriend from "../../hooks/mutations/useUnfriend"; // ✅ 친구삭제 훅
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
  onUnfriendClick: () => void;      // (구버전 호환용) ❗이제 내부 모달로 대체
  onAvatarClick: () => void;
  isRequesting: boolean;            // (호환용) 훅 결과가 우선
  onSendRequestClick: () => void;
}

const ProfileView = ({
  user,
  onClose, // eslint-disable-line @typescript-eslint/no-unused-vars
  onAvatarClick,
  isRequesting,
  onSendRequestClick,
}: ProfileViewProps) => {
  const { language } = useLanguage();
  const t = translate[language];

  const { incRequests } = useFriendCounts();

  // 친구관계 상태(friend | pending | incoming | none)
  const { state, isLoading, refetchAll } = useFriendship(user.id);

  // ✅ 내부 확인 모달/버튼 로딩
  const [showConfirm, setShowConfirm] = useState(false);
  const [btnBusy, setBtnBusy] = useState(false);



  // ✅ 친구삭제 뮤테이션 (성공 시 friends / friendRequests invalidate)
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

  // ✅ 친구삭제 확인 → API 호출 → 캐시 무효화 → 상태 갱신
  const handleConfirmUnfriend = async () => {
    try {
      setBtnBusy(true);
      await unfriend(user.id);  // /friends/:memberId DELETE
      await refetchAll();       // 안전하게 훅 상태 재계산
      setShowConfirm(false);
    } catch (err) {
      console.error("❌ 친구 삭제 실패:", err);
      alert( "친구 삭제에 실패했어요.");
    } finally {
      setBtnBusy(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-2xl shadow">
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
        <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>
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
            className="flex-1 py-3 rounded-xl bg-[#3461F4] text-white text-base font-semibold hover:bg-blue-700 disabled:opacity-60"
            onClick={() => setShowConfirm(true)}         // ✅ 내부 모달 오픈
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
            className="flex-1 py-3 rounded-xl bg-[#3461F4] text-white text-base font-semibold hover:bg-blue-700 disabled:opacity-60"
            disabled={btnBusy}
          >
            {t.sendFriendRequestButton}
          </button>
        )}

        {/* 다이어리 보러가기 (필요 시 라우팅 연결) */}
        <button className="flex-1 py-3 rounded-xl bg-[#EDF3FE] text-[#618BFD] text-base font-semibold hover:bg-blue-100">
          {t.viewDiaryButton}
        </button>
      </div>

      {/* ✅ 친구 취소 확인 모달 (컴포넌트 내부에서 처리) */}
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
