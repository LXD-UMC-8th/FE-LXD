import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Avatar from "../Common/Avatar";
import { useDeleteDiaryMutation } from "../../hooks/mutations/useDiaryDelete";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import clsx from "clsx";
import { useCleanHtml } from "../../hooks/useCleanHtml";
import type { DiaryUploadResult } from "../../utils/types/diary";

const CommonComponentInDiaryNFeed = ({
  props,
}: {
  props: DiaryUploadResult;
}) => {
  const { language } = useLanguage();
  const t = translate[language];
  const location = useLocation();
  const navigate = useNavigate();

  const borderRadius = clsx({
    "rounded-t-2xl": props.idx === 0,
  });

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

  const content = useCleanHtml(props.contentPreview);
  const stats = [
    {
      label: `${props.commentCount}`,
      icon: "/images/CommonComponentIcon/CommentIcon.svg",
    },
    {
      label: `${props.likeCount}`,
      icon: "/images/CommonComponentIcon/LikeIcon.svg",
    },
    {
      label: `${props.correctionCount}`,
      icon: "/images/CommonComponentIcon/CorrectIcon.svg",
    },
  ];

  const deleteMutation = useDeleteDiaryMutation(props.diaryId as number);

  const handleEdit = () => {
    navigate(`/mydiary/edit/${props.diaryId}`);
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate();
    }
  };

  const handleToDetail = () => {
    navigate("/feed/{props.diaryId}");
  };

  return (
    <div
      className={`${borderRadius} relative w-260 bg-white shadow px-6 py-5 space-y-4`}
      onClick={handleToDetail}
    >
      {/* 상단 정보 */}
      <div className="flex justify-between items-start">
        <div>
          {isFeedTab ? (
            <div className="flex items-center gap-3">
              <Avatar
                src={undefined}
                alt={props.writerUsername}
                size="w-9 h-9"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-black">
                  {props.writerUsername}
                </span>
                <span className="text-xs text-gray-500">
                  @{props.writerNickname}
                </span>
              </div>
              <span className="text-xs text-gray-400 ml-2 mt-0.5">
                {props.createdAt}
              </span>
            </div>
          ) : (
            isMyDiaryTab && (
              <div className="text-sm text-gray-500 font-medium">
                #{props.diaryId} · {props.createdAt?.slice(0, 10)}
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
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((prev) => !prev);
                }}
              />
              {menuOpen && (
                <div className="absolute top-8 right-0 bg-white border rounded-md shadow-lg w-28 z-50">
                  <button
                    className="w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit();
                    }}
                  >
                    {t.EditDiary}
                  </button>
                  <button
                    className="w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 text-left"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete();
                    }}
                  >
                    {t.DeleteDiary}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex flex-rows">
        <div className="flex-1 space-y-2">
          {/* 제목 */}
          <div className="flex gap-3 text-subhead3 text-black">
            {props.visibility === "PUBLIC" && (
              <img src="/images/public_icon.svg" alt="전체 공개 아이콘" />
            )}
            {props.visibility === "FRIENDS" && (
              <img src="/images/friend_icon.svg" alt="친구 공개 아이콘" />
            )}
            {props.visibility === "PRIVATE" && (
              <img src="/images/private_icon.svg" alt="비공개 아이콘" />
            )}
            <p className="font-bold text-lg">{props.title}</p>
          </div>

          {/* 본문 */}
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {content}
          </div>
        </div>
        {/* 썸네일 */}
        {props.thumbnailUrl && (
          <div>
            <img className="w-40 h-40" src={props.thumbnailUrl} />
          </div>
        )}
      </div>

      {/* 통계 */}
      <div className="flex gap-6 text-gray-600 text-sm">
        {stats.map((item, index) => (
          <div key={index} className="flex gap-1 items-center">
            <img
              src={item.icon}
              alt={`${item.label} 아이콘`}
              className="w-6 h-6"
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonComponentInDiaryNFeed;
