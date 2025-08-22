import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import Avatar from "../Common/Avatar";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { useDeleteDiaryMutation } from "../../hooks/mutations/useDiaryDelete";
import Header from "./Header";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-quill-new/dist/quill.snow.css";
import { normalizeQuillHtml } from "../../hooks/useQuillListsFix";
import { usePostLike } from "../../hooks/mutations/usePostLike";
import AlertModal from "../Common/AlertModal";

interface DiaryContentProps {
  title?: string;
  lang?: string;
  visibility: string;
  content: string | undefined;
  profileImg?: string;
  writerUsername?: string;
  writerNickname?: string;
  writerUserName?: string;
  writerNickName?: string;
  commentCount?: number;
  likeCount?: number;
  correctCount?: number;
  diaryId: number;
  isLiked?: boolean;
  createdAt?: string;
  thumbnail?: string;
  contentRootRef?: React.RefObject<HTMLDivElement>;
  writerId?: number;
}

// function decodeEscapedHtml(raw?: string | null) {
//   if (!raw) return "";
//   try {
//     // "\"<p>...</p>\"" 같은 문자열을 정상 문자열로 복구
//     const parsed = JSON.parse(raw);
//     if (typeof parsed === "string") return parsed;
//   } catch {
//     /* noop */
//   }
//   // 백슬래시 이스케이프가 남아있는 경우의 최소 복구
//   return raw.replace(/\\"/g, '""');
// }

const DiaryContent = ({
  props,
  focusTextarea,
}: {
  props: DiaryContentProps;
  focusTextarea: () => void;
}) => {
  const { language } = useLanguage();
  const t = translate[language];
  const location = useLocation();
  const navigate = useNavigate();
  const cameFromMyDiary = location.state?.from === "mydiary";

  // 경로가 /mydiary 또는 /mydiary/xxx로 시작하면 true
  const isMyDiaryTab = location.pathname.startsWith("/mydiary");
  const canEdit = isMyDiaryTab || cameFromMyDiary;

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [DeleteLikeModal, setDeleteLikeModal] = useState<boolean>(false);

  const DeleteLikeModalRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(DeleteLikeModalRef, () => setDeleteLikeModal(false));
  useOutsideClick(menuRef, () => setMenuOpen(false));

  const handleEdit = () => navigate(`/mydiary/edit/${props.diaryId}`);

  const deleteMutation = useDeleteDiaryMutation(props.diaryId as number);
  const handleDelete = () => {
    if (window.confirm(t.DeleteConfirm)) {
      deleteMutation.mutate();
    }
  };
  const replaceContent = normalizeQuillHtml(props.content);

  const displayUsername = props.writerUsername ?? props.writerUserName ?? "";
  const displayNickname = props.writerNickname ?? props.writerNickName ?? "";

  const createdDateOnly = props.createdAt?.slice(0, 10);

  //좋아요 핸들러를 위한 설정들
  const [isLiked, setIsLiked] = useState<boolean>(props.isLiked ?? false);
  const [likeCount, setLikeCount] = useState<number>(props.likeCount || 0);

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
      label: `${props.correctCount}`,
      icon: "/images/CommonComponentIcon/CorrectIcon.svg",
    },
  ];
  const { mutate: likeMutate } = usePostLike({
    targetType: "diaries",
    targetId: props.diaryId || 0,
  });

  const handleIcons = (iconIndex: number) => {
    switch (iconIndex) {
      case 0:
        focusTextarea();
        break;
      case 1:
        isLiked
          ? setDeleteLikeModal(true)
          : (likeMutate(),
            setLikeCount((prev) => prev + 1),
            setIsLiked((prev) => !prev));
        break;
      case 2:
        // 교정 아이콘 클릭 핸들러 (필요 시 구현)
        navigate(`/feed/${props.diaryId}/corrections`, {
          state: {
            stats: {
              commentCount: props.commentCount,
              likeCount,
              correctCount: props.correctCount,
            },
            meta: { diaryId: props.diaryId },
          },
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between pb-3">
        {/* 다이어리 번호 & 작성 날짜 */}
        <div className="text-subhead4 text-gray-600 font-medium select-none">
          #{props.diaryId} · {createdDateOnly}
        </div>

        <div
          className="flex items-center text-caption text-gray-700 relative"
          ref={menuRef}
        >
          {/* 더보기 아이콘 */}
          <img
            src="/images/more_options.svg"
            className="w-6 h-6 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            alt="더보기 아이콘"
          />

          {/* 더보기 메뉴: mydiary에서만 */}
          {canEdit && menuOpen && (
            <div className="absolute top-8 right-0 bg-white border border-gray-200 shadow-lg rounded-md w-28 z-50">
              <button
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left cursor-pointer"
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
        </div>
      </div>

      {/* 제목 & 상태 */}
      <div className="flex items-center mb-5 no-click no-drag select-none">
        <Header props={{ visibility: props?.visibility }} />
        <h1 className="flex-1 pr-4 text-subhead2 font-semibold">
          {props.title}
        </h1>
        <span className="text-blue-600 text-body2 font-medium ml-auto ">
          {props.lang === "KO" ? "한국어" : "English"}
        </span>
      </div>

      {/* 작성자 + 우측 메뉴 */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4 select-none">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(`/diaries/member/${props.writerId}`)}
        >
          <Avatar
            src={props.profileImg}
            alt={displayNickname}
            size="w-8 h-8"
            className=""
          />
          <span className="text-black font-medium">{displayNickname}</span>
          <div className="w-px h-4 bg-gray-600" />
          <span className="text-gray-600">@{displayUsername}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 my-5" />

      {/* 본문 */}

      <div className="select-text">
        <div
          ref={props.contentRootRef}
          data-role="diary-content"
          className="quill-editor ql-indent-2 [&_img]:max-w-full [&_img]:h-auto [&_img]:my-2 [&_.ql-align-right]:text-right [&_.ql-align-center]:text-center"
          dangerouslySetInnerHTML={{ __html: replaceContent }}
        />
      </div>

      <div className="border-t border-gray-200 my-5" />

      {/* 하단 통계 */}
      <div className="flex items-center gap-3 text-caption text-gray-700 select-none">
        {stats?.map((item, index) => (
          <div
            key={index}
            className="flex gap-1 items-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleIcons(index);
            }}
          >
            <img src={item.icon} alt="icons" className="w-6 h-6" />
            <span className="text-body2">{item.label}</span>
          </div>
        ))}
      </div>
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

export default DiaryContent;
