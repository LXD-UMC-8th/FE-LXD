import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Avatar from "../Common/Avatar";
import { useDeleteDiaryMutation } from "../../hooks/mutations/useDiaryDelete";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import clsx from "clsx";
import { useCleanHtml } from "../../hooks/useCleanHtml";
import { queryClient } from "../../App";
import type { diaries, getDiariesResult } from "../../utils/types/diary";
// import useDebounce from "../../hooks/queries/useDebounce";
import { usePostLike } from "../../hooks/mutations/usePostLike";
import Header from "../Diary/Header";
import type { getLikeResponseDTO } from "../../utils/types/likes";
import useOutsideClick from "../../hooks/useOutsideClick";
import AlertModal from "./AlertModal";

const CommonComponentInDiaryNFeed = ({
  props,
}: {
  props: diaries;
  pageResult?: getDiariesResult;
  idx?: number;
}) => {
  const { language } = useLanguage();
  const t = translate[language];
  const location = useLocation();
  const navigate = useNavigate();
  console.log("props", props);

  const [isLiked, setIsLiked] = useState<boolean>(props.isLiked);
  const [likeCount, setLikeCount] = useState<number>(props.likeCount);

  const { mutate: likeMutate } = usePostLike({
    targetType: "diaries",
    targetId: props.diaryId,
  });

  //css를 외부에서 적용할지 말지 고민을 조금 해봐야할듯.
  const borderRadius = clsx({
    // "rounded-t-2xl": pageResult.page === 1 && idx === 0,
    // "rounded-b-2xl":
    //   idx === pageResult.diaries.length - 1 && !pageResult.hasNext,
  });

  const isMyDiaryTab = location.pathname.startsWith("/mydiary");
  const isFeedTab = location.pathname.startsWith("/feed");

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  //모달 바깥에 띄운 것 취소하는 핸들러
  useOutsideClick(menuRef, () => setMenuOpen(false));

  const content = useCleanHtml(props.contentPreview);
  const stats = [
    {
      label: `${props.commentCount}`,
      icon: "/images/CommonComponentIcon/CommentIcon.svg",
    },
    {
      label: `${likeCount}`,
      icon: isLiked
        ? "/images/CommonComponentIcon/LikeFullIcon.svg"
        : "/images/CommonComponentIcon/LikeIcon.svg",
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
      deleteMutation?.mutate();
    }
  };

  const handleToDetail = () => {
    navigate(`/feed/${props.diaryId}`);
  };

  const [DeleteLikeModal, setDeleteLikeModal] = useState<boolean>(false);
  const DeleteLikeModalRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(DeleteLikeModalRef, () => setDeleteLikeModal(false));

  const handlerDeleteLike = () => {};

  const handleIcons = (iconIndex: number) => {
    switch (iconIndex) {
      case 0:
        // 댓글 아이콘 클릭 핸들러
        navigate(`/feed/${props.diaryId}`);
        break;
      case 1:
        //좋아요 아이콘 클릭 핸들러

        isLiked
          ? setDeleteLikeModal(true)
          : (likeMutate(),
            setLikeCount((prev) => prev + 1),
            setIsLiked((prev) => !prev));
        break;
      case 2:
        // 교정 아이콘 클릭 핸들러
        break;
      default:
        // Handle default case
        break;
    }
  };
  return (
    <div
      className={`${borderRadius} relative w-260 bg-white shadow px-6 py-5 space-y-4 cursor-pointer`}
      onClick={handleToDetail}
    >
      {/* 상단 정보 */}
      <div className="flex justify-between items-start">
        <div>
          {isFeedTab ? (
            <div className="flex items-center gap-3">
              <Avatar
                src={props.profileImg}
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
                alt="설정 아이콘"
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

      {/* 내용 시작 */}
      <div className="flex flex-rows">
        <div className="flex-1 space-y-2">
          {/* 제목 */}
          <Header props={props} />

          {/* 본문 */}
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {content}
          </div>
        </div>
        {/* 썸네일 */}
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
            <img
              src={item.icon}
              alt={`${item.label} 아이콘`}
              className="w-6 h-6 cursor-pointer"
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      {/* 좋아요 삭제 모달 */}
      {DeleteLikeModal && (
        <AlertModal
          title="'좋아요' 취소 시 해당 일기가 '피드-좋아요'에서 삭제됩니다. 정말 취소하시겠습니까?"
          confirmText="취소하기"
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
          alertMessage="'좋아요' 취소 시 해당 일기가 '피드-좋아요'에서 삭제됩니다. 정말 취소하시겠습니까?"
        />
      )}
    </div>
  );
};

export default CommonComponentInDiaryNFeed;
