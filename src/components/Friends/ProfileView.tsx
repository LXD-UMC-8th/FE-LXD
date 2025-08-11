import { useEffect } from "react";
import { X } from "lucide-react";
import Avatar from "../Common/Avatar";
import { useNavigate } from "react-router-dom";
import { addRecentSearch } from "../../utils/types/recentSearch";
import { postFriendRequest } from "../../apis/friend";
import useFriendship from "../../hooks/queries/useFriendship";

interface ProfileViewProps {
  user: {
    name: string;
    username: string;
    image?: string;
    isFriend: boolean; // (호환용) 훅 결과가 우선
    id: number;
  };
  onClose: () => void;
  onUnfriendClick: () => void;
  onAvatarClick: () => void;
  isRequesting: boolean; // (호환용) 훅 결과가 우선
  onSendRequestClick: () => void;
}

const ProfileView = ({
  user,
  onClose,
  onUnfriendClick,
  onAvatarClick,
  isRequesting,
  onSendRequestClick,
}: ProfileViewProps) => {
  const navigate = useNavigate();

  // 친구관계 상태(friend | pending | incoming | none)
  const { state, isLoading, refetchAll } = useFriendship(user.id);

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
      alert("친구 요청에 실패했습니다.");
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
            로딩중…
          </button>
        ) : mergedState === "friend" ? (
          <button
            className="flex-1 py-3 rounded-xl bg-[#3461F4] text-white text-base font-semibold hover:bg-blue-700"
            onClick={onUnfriendClick}
          >
            친구
          </button>
        ) : mergedState === "pending" ? (
          <button
            disabled
            className="flex-1 py-3 rounded-xl bg-[#EDF3FE] text-[#618BFD] text-base font-semibold cursor-not-allowed flex items-center justify-center gap-2"
          >
            <img src="/images/requestingIcon.svg" alt="요청중" className="w-5 h-5" />
            요청중
          </button>
        ) : mergedState === "incoming" ? (
          <div className="flex-1 grid grid-cols-2 gap-3">
            <button className="py-3 rounded-xl bg-[#3461F4] text-white font-semibold">
              수락
            </button>
            <button className="py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold">
              거절
            </button>
          </div>
        ) : (
          <button
            onClick={handleSendRequest}
            className="flex-1 py-3 rounded-xl bg-[#3461F4] text-white text-base font-semibold hover:bg-blue-700"
          >
            친구 요청하기
          </button>
        )}

        {/* ✅ 다이어리 보러가기: memberId로 이동 */}
        <button
          onClick={() => navigate(`/diaries/member/${user.id}`)}
          className="flex-1 py-3 rounded-xl bg-[#EDF3FE] text-[#618BFD] text-base font-semibold hover:bg-blue-100"
        >
          다이어리 보러가기
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
