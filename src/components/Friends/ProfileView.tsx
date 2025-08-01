import { X } from "lucide-react";
import Avatar from "../Common/Avatar";
import { useEffect, useState } from "react";
import ProfileViewSkeleton from "./Skeleton/ProfileViewSkeleton";


interface ProfileViewProps {
  user: { name: string; username: string; image?: string };
  onClose: () => void;
}

const ProfileView = ({ user, onClose }: ProfileViewProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // API 호출 시뮬레이션 (1초 후 로딩 종료)
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ProfileViewSkeleton />;
  }

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-2xl shadow">
      {/* 상단 프로필 영역 */}
      <div className="p-8 pb-6 flex justify-between items-start">
        <div className="flex items-center gap-6">
          <Avatar
            src={user.image}
            alt={`${user.name} profile`}
            size="w-24 h-24"
            className="border border-gray-200"
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

      {/* 버튼 영역 */}
      <div className="px-8 mb-6 flex gap-4">
        <button className="flex-1 py-3 rounded-xl bg-[#3461F4] text-white text-base font-semibold hover:bg-blue-700 cursor-pointer">
          친구
        </button>
        <button className="flex-1 py-3 rounded-xl bg-[#EDF3FE] text-[#618BFD] text-base font-semibold hover:bg-blue-100 cursor-pointer">
          다이어리 보러가기
        </button>
      </div>

      {/* 구분선 */}
      <div className="h-px bg-gray-200 w-full mb-5" />

      {/* 최근 일기 헤더 */}
      <div className="px-8 flex justify-between items-center mb-4">
        <div className="text-lg font-bold text-gray-900">최근 일기</div>
        <button className="text-sm text-gray-500 hover:underline">더보기</button>
      </div>

      {/* 다이어리 목록 */}
      <div className="px-8 pb-8 flex flex-col gap-5">
        {[1, 2].map((_, idx) => (
          <div
            key={idx}
            className="flex justify-between items-start p-5 rounded-xl border border-gray-200 bg-white"
          >
            <div className="flex flex-col gap-2 flex-1">
              {/* 전체 아이콘 + 제목 */}
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
                요즘 10시쯤 자고 6시쯤 일어나는 루틴을 유지하려고 하는 중. 아직
                완벽하진 않는데, 일찍 자려는 의식이 생긴 것만으로도 괜찮은 변화
                같음. 아침에 일어나서 제일 먼저 물 한 잔 마시고 스트레칭...
              </p>

              {/* 댓글/하트/연필 아이콘 */}
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
