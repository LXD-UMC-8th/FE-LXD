import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Avatar from "../Common/Avatar";
import { useMutation } from "@tanstack/react-query";
import { deleteDiary } from "../../apis/diary";

interface CommonComponentInDiaryNFeedProps {
  diaryId: number;
  imgUrl?: string;
  userId?: string;
  userNickname?: string;
  specificData?: string;
  postNumber?: string;
  date?: string;
}

const CommonComponentInDiaryNFeed = ({
  diaryId,
}: CommonComponentInDiaryNFeedProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isMyDiaryTab = location.pathname.startsWith("/mydiary");
  const isFeedTab = location.pathname.startsWith("/feed");

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const stats = [
    { label: "180", icon: "/images/CommonComponentIcon/CommentIcon.svg" },
    { label: "89", icon: "/images/CommonComponentIcon/LikeIcon.svg" },
    { label: "5", icon: "/images/CommonComponentIcon/CorrectIcon.svg" },
  ];

  const deleteMutation = useMutation({
    mutationFn: () => deleteDiary(diaryId),
    onSuccess: () => {
      alert("일기가 삭제되었습니다.");
      navigate("/mydiary");
    },
    onError: (err) => {
      alert("삭제에 실패했습니다.");
      console.error(err);
    },
  });

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate();
    }
  };

  const handleEdit = () => {
    navigate(`/mydiary/edit/${diaryId}`);
  };

  return (
    <div className="relative w-full bg-white rounded-2xl shadow px-6 py-5 space-y-4">
      {/* 상단 정보 */}
      <div className="flex justify-between items-start">
        <div>
          {isFeedTab ? (
            <div className="flex items-center gap-3">
              <Avatar src={undefined} alt="이재연 프로필" size="w-9 h-9" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-black">이재연</span>
                <span className="text-xs text-gray-500">@jaeyeonlee</span>
              </div>
              <span className="text-xs text-gray-400 ml-2 mt-0.5">
                2025.06.16 오후 02:44
              </span>
            </div>
          ) : (
            isMyDiaryTab && (
              <div className="text-sm text-gray-500 font-medium">
                #3 · 2025.07.09
              </div>
            )
          )}
        </div>

        {/* 언어 + 더보기 */}
        <div className="flex items-center gap-3 relative" ref={menuRef}>
          <span className="text-blue-600 text-sm font-medium">한국어</span>
          {isMyDiaryTab && (
            <>
              <img
                src="/images/more_options.svg"
                className="w-5 h-5 cursor-pointer"
                onClick={() => setMenuOpen((prev) => !prev)}
              />
              {menuOpen && (
                <div className="absolute top-8 right-0 bg-white border rounded-md shadow-lg w-28 z-50">
                  <button
                    className="w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
                    onClick={handleEdit}
                  >
                    수정하기
                  </button>
                  <button
                    className="w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 text-left"
                    onClick={handleDelete}
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* 제목 */}
      <div className="flex gap-3 text-subhead3 text-black">
        <img
          src="/images/public_icon.svg"
          alt="전체 공개 아이콘"
          className="w-6 h-6"
        />
        <p className="font-bold text-lg">요즘 7월 루틴을 체크해보자~~</p>
      </div>

      {/* 본문 */}
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
        요즘 10시쯤 자고 6시쯤 일어나는 루틴을 유지하려고 하는 중. 아직
        완벽하진 않은데, 일찍 자려는 의식이 생긴 것만으로도 괜찮은 변화 같음...
      </p>

      {/* 통계 */}
      <div className="flex gap-6 text-gray-600 text-sm">
        {stats.map((item, index) => (
          <div key={index} className="flex gap-1 items-center">
            <img
              src={item.icon}
              alt={`${item.label} 아이콘`}
              className="w-4 h-4"
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonComponentInDiaryNFeed;
