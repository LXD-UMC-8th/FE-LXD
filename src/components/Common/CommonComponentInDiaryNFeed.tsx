import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Avatar from "../Common/Avatar";
import { useDeleteDiaryMutation } from "../../hooks/mutations/useDiaryDelete";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import clsx from "clsx";
import { useCleanHtml } from "../../hooks/useCleanHtml";
import type { diaries, getDiariesResult } from "../../utils/types/diary";
import { usePostLike } from "../../hooks/mutations/usePostLike";
import Header from "../Diary/Header";
import useOutsideClick from "../../hooks/useOutsideClick";
import AlertModal from "./AlertModal";

type Variant = "default" | "friendPreview";

interface Props {
  props: diaries;
  pageResult?: getDiariesResult;
  idx?: number;
  /** ✅ 기본(true): 둥근 모서리 유지, false: 모서리 제거 */
  rounded?: boolean;
  /** (옵션) 표시 컨텍스트가 다르면 스타일을 살짝 달리하고 싶을 때 */
  variant?: Variant;
}

const CommonComponentInDiaryNFeed = ({
  props,
  rounded = false,              // ✅ 기본은 기존처럼 둥글게
  variant = "default",
}: Props) => {
  const { language } = useLanguage();
  const t = translate[language];
  const location = useLocation();
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState<boolean>(props.isLiked || false);
  const [likeCount, setLikeCount] = useState<number>(props.likeCount || 0);

  const { mutate: likeMutate } = usePostLike({
    targetType: "diaries",
    targetId: props.diaryId || 0,
  });

  const borderRadius = clsx({
    // "rounded-t-2xl": pageResult?.page === 1 && idx === 0,
    // "rounded-b-2xl": idx === (pageResult?.diaries?.length ?? 1) - 1 && !pageResult?.hasNext,
  });

  const isDiaryTab =
    location.pathname.startsWith("/mydiary") ||
    location.pathname.startsWith("/diaries");
  const isMyDiaryTab = location.pathname.startsWith("/mydiary");
  const isFeedTab = location.pathname.startsWith("/feed");

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(menuRef, () => setMenuOpen(false));

  const content = useCleanHtml(props.contentPreview);

  const stats = [
    { label: `${props.commentCount}`, icon: "/images/CommonComponentIcon/CommentIcon.svg" },
    {
      label: `${likeCount}`,
      icon: isLiked
        ? "/images/CommonComponentIcon/LikeFullIcon.svg"
        : "/images/CommonComponentIcon/LikeIcon.svg",
    },
    { label: `${props.correctionCount}`, icon: "/images/CommonComponentIcon/CorrectIcon.svg" },
  ];

  const deleteMutation = useDeleteDiaryMutation(props.diaryId as number);

  const handleEdit = () => {
    navigate(`/mydiary/edit/${props.diaryId}`);
  };

  const handleDelete = () => {
    if (window.confirm(t.ConfirmDelete)) {
      deleteMutation?.mutate();
    }
  };

  const goToDetail = () => {
    navigate(`/feed/${props.diaryId}`, {
      state: isMyDiaryTab
        ? { from: "mydiary", commentCountFromList: props.commentCount }
        : { commentCountFromList: props.commentCount },
    });
  };

  const [DeleteLikeModal, setDeleteLikeModal] = useState<boolean>(false);
  const DeleteLikeModalRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(DeleteLikeModalRef, () => setDeleteLikeModal(false));

  const handleIcons = (iconIndex: number) => {
    switch (iconIndex) {
      case 0:
        navigate(`/feed/${props.diaryId}`, {
          state: isMyDiaryTab ? { from: "mydiary" } : undefined,
        });
        break;
      case 1:
        isLiked
          ? setDeleteLikeModal(true)
          : (likeMutate(), setLikeCount((prev) => prev + 1), setIsLiked((prev) => !prev));
        break;
      case 2:
        // 교정 아이콘 클릭 핸들러 (필요 시 구현)
        break;
      default:
        break;
    }
  };

  const handleNavigateUserDetail = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`/diaries/member/${props.writerId}`);
  };

  /** ✅ 둥근 모서리 토글 */
  const roundedCls = rounded ? "rounded-2xl" : "rounded-none";

  /** ✅ 컨테이너 클래스 (기존 스타일 유지, variant로 미세 조정 가능) */
  const containerCls = clsx(
    borderRadius,
    "relative bg-white cursor-pointer transition-shadow",
    variant === "friendPreview"
      ? clsx("w-full border border-gray-200 px-5 py-4 hover:shadow-sm", roundedCls)
      : clsx("w-260 shadow px-6 py-5 space-y-4", roundedCls)
  );

  return (
    <div className={containerCls} onClick={goToDetail}>
      {/* 상단 정보 */}
      <div className="flex justify-between items-start">
        <div>
          {isFeedTab ? (
            <div className="flex items-center gap-3" onClick={handleNavigateUserDetail}>
              <Avatar src={props.writerProfileImg} alt={props.writerUsername} size="w-9 h-9" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-black">
                    {props.writerNickname}
                  </span>
                  <div className="w-px h-4 bg-gray-500" />
                  <span className="text-xs text-gray-500">
                    @{props.writerUsername}
                  </span>
                </div>
                <span className="text-xs text-gray-400 mt-1">{props.createdAt}</span>
              </div>
            </div>
          ) : (
            isDiaryTab && (
              <div className="text-sm text-gray-500 font-medium">
                #{props.diaryId} · {props.createdAt?.slice(0, 10)}
              </div>
            )
          )}
        </div>

        {/* 언어 + 더보기 */}
        <div className="flex items-center gap-3 relative" ref={menuRef}>
          <span className="text-blue-600 text-sm font-medium">
            한국어
          </span>
          {isMyDiaryTab && (
            <>
              <img
                src="/images/more_options.svg"
                className="w-5 h-5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((prev) => !prev);
                }}
                alt="settingIcon"
              />
              {menuOpen && (
                <div className="absolute top-8 right-0 bg-white border border-gray-400 rounded-md shadow-lg w-28 z-50">
                  <button
                    className="w-full px-4 py-2 text-sm hover:bg-gray-100 text-left cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit();
                    }}
                  >
                    {t.EditDiary}
                  </button>
                  <button
                    className="w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 text-left cursor-pointer"
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

      {/* 내용 */}
      <div className="flex flex-rows">
        <div className="flex-1 space-y-2">
          <Header props={props} />
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{content}</div>
        </div>

        {props.thumbnailUrl && (
          <div>
            <img className="w-40 h-40" src={props.thumbnailUrl} alt="썸네일" />
          </div>
        )}
      </div>

      {/* 통계 */}
      <div className="flex gap-6 text-gray-600 text-sm">
        {stats.map((item, index) => (
          <div
            key={index}
            className="flex gap-1 items-center"
            onClick={(e) => {
              e.stopPropagation();
              handleIcons(index);
            }}
          >
            <img src={item.icon} alt={`${item.label} Icon`} className="w-6 h-6 cursor-pointer" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* 좋아요 삭제 모달 */}
      {DeleteLikeModal && (
        <AlertModal
          title={t.ConfirmDeleteFeedLikes}
          confirmText={t.Unlike}
          onConfirm={(e) => {
            e.stopPropagation();
            setDeleteLikeModal(false);
            setLikeCount((prev) => Math.max(0, prev - 1));
            setIsLiked((prev) => !prev);
            likeMutate();
          }}
          onClose={(e) => {
            e.stopPropagation();
            setDeleteLikeModal(false);
          }}
          alertMessage={t.ConfirmDeleteFeedLikes}
        />
      )}
    </div>
  );
};

export default CommonComponentInDiaryNFeed;
