import { X } from "lucide-react"; //npm install lucide-react

interface Props {
  user: { name: string; username: string };
  onClose: () => void; 
}

export default function ProfileView({ user, onClose }: Props) {
  return (
    <div className="flex flex-col w-full h-full bg-white p-6 rounded-lg shadow-inner">
      {/* 상단 프로필 영역 */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-300" />
          <div>
            <div className="text-lg font-semibold text-gray-800">
              {user.name}
            </div>
            <div className="text-sm text-gray-500">@{user.username}</div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 cursor-pointer"
        onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-2 mb-6">
        <button className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm font-medium">
          친구요청하기
        </button>
        <button className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 text-sm font-medium">
          다이어리 보러가기
        </button>
      </div>

      {/* 최근 다이어리 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-semibold text-gray-800">최근 다이어리</div>
        <button className="text-xs text-gray-500 hover:underline">더보기</button>
      </div>

      {/* 다이어리 목록 */}
      <div className="flex flex-col gap-4">
        {[1, 2].map((_, idx) => (
          <div
            key={idx}
            className="flex justify-between items-start p-4 border rounded-lg bg-white"
          >
            <div className="flex flex-col gap-1">
              <div className="text-xs text-blue-500 font-medium">전체</div>
              <div className="text-sm font-semibold text-gray-800">
                요즘 7월 루틴을 체크해보자~~
              </div>
              <p className="text-xs text-gray-500 leading-5">
                요즘 10시에 자고 6시에 일어나는 루틴을 유지하려고 하는 중. 아직 완벽하진 않지만,
                일찍 자려는 의식이 생긴 것만으로도 괜찮은 변화 같음. 아침에 일어나서 제일 먼저 물 한 잔 마시고 스트레칭...
              </p>
              <div className="flex gap-3 text-xs text-gray-400 mt-2">
                <span>💬 댓글</span>
                <span>❤️ 좋아요</span>
                <span>📄 공유</span>
              </div>
            </div>
            <div className="w-24 h-20 bg-gray-200 rounded-lg ml-4 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
