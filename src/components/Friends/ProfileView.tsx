import { X } from "lucide-react";
import Avatar from "../Common/Avatar";
import { useEffect, useState } from "react";
import ProfileViewSkeleton from "./Skeleton/ProfileViewSkeleton";
import { useNavigate } from "react-router-dom"; // ✅ 라우터 이동용

interface ProfileViewProps {
  user: {
    name: string;
    username: string;
    image?: string;
    isFriend: boolean;
  };
  onClose: () => void;
  onUnfriendClick: () => void;
  onAvatarClick: () => void;
  isRequesting: boolean;
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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // ✅ 라우터 이동 훅

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <ProfileViewSkeleton />;

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-2xl shadow">
      {/* 상단 프로필 영역 */}
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
        <button
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
          onClick={onClose}
        >
          <X size={24} />
        </button>
      </div>

      {/* 버튼 영역 */}
      <div className="px-8 mb-6 flex gap-4">
        {user.isFriend ? (
          <button
            className="flex-1 py-3 rounded-xl bg-[#3461F4] text-white text-base font-semibold hover:bg-blue-700 cursor-pointer"
            onClick={onUnfriendClick}
          >
            친구
          </button>
        ) : isRequesting ? (
          <button
            disabled
            className="flex-1 py-3 rounded-xl bg-[#EDF3FE] text-[#618BFD] text-base font-semibold cursor-not-allowed flex items-center justify-center gap-2"
          >
            <img src="/images/requestingIcon.svg" alt="요청중" className="w-5 h-5" />
            요청중
          </button>
        ) : (
          <button
            onClick={onSendRequestClick}
            className="flex-1 py-3 rounded-xl bg-[#3461F4] text-white text-base font-semibold hover:bg-blue-700 cursor-pointer"
          >
            친구 요청하기
          </button>
        )}

        <button
          onClick={() => navigate("/feed/1")} // ✅ 다이어리 페이지로 이동
          className="flex-1 py-3 rounded-xl bg-[#EDF3FE] text-[#618BFD] text-base font-semibold hover:bg-blue-100 cursor-pointer"
        >
          다이어리 보러가기
        </button>
      </div>

      {/* 구분선 */}
      <div className="h-px bg-gray-200 w-full mb-5" />

      {/* 최근 일기 헤더 */}
      <div className="px-8 flex justify-between items-center mb-4">
        <div className="text-lg font-bold text-gray-900">최근 일기</div>
      </div>

      {/* 다이어리 목록 */}
      <div className="px-8 pb-8 flex flex-col gap-5">
        {[1, 2].map((_, idx) => (
          <div
            key={idx}
            className="flex justify-between items-start p-5 rounded-xl border border-gray-200 bg-white"
          >
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex gap-3 items-center mb-2">
                <img
                  src="/images/public_icon.svg"
                  alt="전체 아이콘"
                  className="h-6 w-auto"
                />
                <p className="font-bold text-lg text-gray-900">
                  여름방학 일기 {3 - idx}일차
                </p>
              </div>
              <p className="text-sm text-gray-700 leading-6 line-clamp-2">
                요즘 10시쯤 자고 6시쯤 일어나는 루틴을 유지하려고 하는 중...
              </p>
              <div className="flex gap-6 text-sm text-gray-500 mt-3">
                <div className="flex items-center gap-1">
                  <img
                    src="/images/emptycommentIcon.svg"
                    alt="댓글"
                    className="w-5 h-5"
                  />
                  <span>180</span>
                </div>
                <div className="flex items-center gap-1">
                  <img
                    src="/images/EmptyHeartIcon.svg"
                    alt="좋아요"
                    className="w-5 h-5"
                  />
                  <span>89</span>
                </div>
                <div className="flex items-center gap-1">
                  <img
                    src="/images/emptycorrectionIcon.svg"
                    alt="공유"
                    className="w-5 h-5"
                  />
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
