import Avatar from "../Common/Avatar";

interface ProfileModalProps {
  user: {
    name: string;
    username: string;
    profileImage?: string;
    isFriend: boolean;
  };
  onClose: () => void;
  onUnfriendClick: () => void;
  onSendRequestClick: () => void;
}

const ProfileModal = ({
  user,
  onClose,
  onUnfriendClick,
  onSendRequestClick,
}: ProfileModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-96 p-6">
        {/* 프로필 상단 */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <Avatar
              src={user.profileImage}
              alt={`${user.name}의 프로필 이미지`}
              size="w-20 h-20"
            />
            <div>
              <div className="text-xl font-semibold text-gray-900">
                {user.name}
              </div>
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

        {/* 버튼 영역 */}
        <div className="flex justify-center gap-4">
          {user.isFriend ? (
            <button
              onClick={onUnfriendClick}
              className="min-w-[144px] py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 cursor-pointer"
            >
              친구
            </button>
          ) : (
            <button
              onClick={onSendRequestClick}
              className="min-w-[144px] py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 cursor-pointer"
            >
              친구 요청하기
            </button>
          )}

          <button className="min-w-[144px] py-2 rounded-lg bg-gray-100 text-sm text-gray-700 font-medium hover:bg-gray-200">
            다이어리 보러가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
