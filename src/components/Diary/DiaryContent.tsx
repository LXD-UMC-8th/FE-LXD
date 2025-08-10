import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Avatar from "../Common/Avatar"; // 경로 맞게 수정

interface DiaryContentProps {
  title: string;
  language: string;
  visibility: string;
  content?: string;
  profileImg?: string;
  writerUsername?: string;
  writerNickname?: string;
  stats: { label: string; icon: string; alt: string }[];
}

const DiaryContent = ({
  title,
  language,
  visibility,
  content,
  profileImg,
  writerUsername,
  writerNickname,
  stats,
}: DiaryContentProps) => {
  const location = useLocation();

  // 경로가 /mydiary 또는 /mydiary/xxx로 시작하면 true
  const isMyDiaryTab = location.pathname.startsWith("/mydiary");

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* 제목 & 상태 */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
          {visibility}
        </span>
        <h1 className="text-subhead2 font-semibold">{title}</h1>
        <span className="text-blue-600 text-body2 font-medium ml-auto">
          {language}
        </span>
      </div>

      {/* 작성자 + 우측 메뉴 */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <Avatar
            src={profileImg}
            alt={writerNickname}
            size="w-8 h-8"
            className=""
          />
          <span className="text-black font-medium">{writerNickname}</span>
          <div className="w-px h-4 bg-gray-600" />
          <span className="text-gray-600">@{writerUsername}</span>
        </div>

        <div
          className="flex items-center gap-3 text-caption text-gray-700 pt-5 relative"
          ref={menuRef}
        >
          {stats.map((item, index) => (
            <div key={index} className="flex gap-1">
              <img
                src={item.icon}
                alt={`${item.alt} 아이콘`}
                className="w-4 h-4"
              />
              <span>{item.label}</span>
            </div>
          ))}

          {/* 더보기 아이콘 */}
          <img
            src="/images/more_options.svg"
            className="w-5 h-5 cursor-pointer"
            onClick={() => {
              console.log("🖱️ 더보기 버튼 클릭됨!");
              setMenuOpen((prev) => !prev);
            }}
            alt="더보기 아이콘"
          />

          {/* 드롭다운 메뉴: /mydiary일 때만, 열려있으면 표시 */}
          {isMyDiaryTab && menuOpen && (
            <div className="absolute top-8 right-0 bg-white border border-gray-200 shadow-lg rounded-md w-28 z-50">
              <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                수정하기
              </button>
              <button className="w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 text-left">
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 my-5" />

      {/* 본문 */}
      <div className="text-center mx-20">
        <div className="w-full h-52 bg-gray-200 rounded-[10px] mb-4" />
        <p className="text-body2 leading-relaxed text-gray-800 whitespace-pre-line">
          {content}
        </p>
      </div>

      <div className="border-t border-gray-200 my-5" />

      {/* 하단 통계 */}
      <div className="flex items-center gap-3 text-caption text-gray-700">
        {stats.map((item, index) => (
          <div key={index} className="flex gap-1">
            <img
              src={item.icon}
              alt={`${item.alt} 아이콘`}
              className="w-4 h-4"
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiaryContent;
