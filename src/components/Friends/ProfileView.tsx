import { useEffect } from "react";
import { X } from "lucide-react";
import Avatar from "../Common/Avatar";
import { useNavigate } from "react-router-dom";
import { addRecentSearch } from "../../utils/types/recentSearch";
import { postFriendRequest } from "../../apis/friend";
import useFriendship from "../../hooks/queries/useFriendship"; // ✅ 추가

interface ProfileViewProps {
  user: {
    name: string;
    username: string;
    image?: string;
    isFriend: boolean;   // (과거 호환용) 훅 결과가 우선
    id: number;
  };
  onClose: () => void;
  onUnfriendClick: () => void;
  onAvatarClick: () => void;
  isRequesting: boolean; // (과거 호환용) 훅 결과가 우선
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

  // ✅ 친구관계 상태 조회 (friend | pending | incoming | none)
  const { state, isLoading, refetchAll } = useFriendship(user.id);

  // 과거 프롭과 병합(훅 우선, 프롭은 fallback)
  const mergedState =
    isLoading ? "loading"
    : state === "friend" || state === "pending" || state === "incoming" || state === "none"
    ? state
    : (user.isFriend ? "friend" : (isRequesting ? "pending" : "none"));

  useEffect(() => {
    if (user?.username) addRecentSearch(user.username);
  }, [user?.username]);

  const handleSendRequest = async () => {
    try {
      await postFriendRequest({ receiverId: user.id });
      onSendRequestClick?.();
      await refetchAll(); // ✅ 요청 후 최신 상태 반영
    } catch (err: any) {
      // 이미 보낸 요청(409)은 '요청중'으로 보이게 갱신
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

      <div className="px-8 mb-6 flex gap-4">
        {/* 버튼 상태 분기 */}
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
          // 받은 요청 상태를 쓸 계획 없다면 이 블록은 제거해도 됨
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

        <button
          onClick={() => navigate("/feed/1", { state: { from: "profile" } })}
          className="flex-1 py-3 rounded-xl bg-[#EDF3FE] text-[#618BFD] text-base font-semibold hover:bg-blue-100"
        >
          다이어리 보러가기
        </button>
      </div>

      <div className="h-px bg-gray-200 w-full mb-5" />

      <div className="px-8 flex justify-between items-center mb-4">
        <div className="text-lg font-bold text-gray-900">최근 일기</div>
      </div>

      {/* 최근 일기 더미 */}
      <div className="px-8 pb-8 flex flex-col gap-5">
        {[1, 2].map((_, idx) => (
          <div
            key={idx}
            className="flex justify-between items-start p-5 rounded-xl border border-gray-200 bg-white"
          >
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex gap-3 items-center mb-2">
                <img src="/images/public_icon.svg" alt="전체 아이콘" className="h-6 w-auto" />
                <p className="font-bold text-lg text-gray-900">
                  여름방학 일기 {3 - idx}일차
                </p>
              </div>
              <p className="text-sm text-gray-700 leading-6 line-clamp-2">
                요즘 10시쯤 자고 6시쯤 일어나는 루틴을 유지하려고 하는 중...
              </p>
              <div className="flex gap-6 text-sm text-gray-500 mt-3">
                <div className="flex items-center gap-1">
                  <img src="/images/emptycommentIcon.svg" alt="댓글" className="w-5 h-5" />
                  <span>180</span>
                </div>
                <div className="flex items-center gap-1">
                  <img src="/images/EmptyHeartIcon.svg" alt="좋아요" className="w-5 h-5" />
                  <span>89</span>
                </div>
                <div className="flex items-center gap-1">
                  <img src="/images/emptycorrectionIcon.svg" alt="공유" className="w-5 h-5" />
                  <span>5</span>
                </div>
              </div>
            </div>
            <div className="w-36 h-28 bg-gray-200 rounded-xl ml-4 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileView;
