import { useEffect, useMemo, useState, useRef } from "react";
import ProfileComponent from "../Common/ProfileComponent";
import type { ContentsDTO } from "../../utils/types/correction";
import { useGetCorrectionComments } from "../../hooks/mutations/CorrectionComment/useGetCorrectionComments";
import { usePostCorrectionComment } from "../../hooks/mutations/CorrectionComment/usePostCorrectionComments";
import LoadingModal from "../Common/LoadingModal";
import AlertModal from "../Common/AlertModal";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { axiosInstance, getLocalStorageItem } from "../../apis/axios";
import { useMutation } from "@tanstack/react-query";
import { deleteCorrectionComment } from "../../apis/correctionComment";
import useOutsideClick from "../../hooks/useOutsideClick";
import type {
  CorrectionCommentDTO,
  CorrectionCommentGetResponseDTO,
  CorrectionCommentRequestDTO,
} from "../../utils/types/correctionComment";
import { useNavigate } from "react-router-dom";

type CorrectionsInDiaryDetailProps = {
  props: ContentsDTO;
};

type CorrectionLikeResponseDTO = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    correctionId: number;
    memberId: number;
    likeCount: number;
    liked: boolean;
  };
};

const RED_FILTER =
  "invert(16%) sepia(97%) saturate(7471%) hue-rotate(356deg) brightness(96%) contrast(104%)";

const CorrectionsInDiaryDetail = ({ props }: CorrectionsInDiaryDetailProps) => {
  const { language } = useLanguage();
  const t = translate[language];
  const navigate = useNavigate();

  const [openCorrectionReply, setOpenCorrectionReply] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState<boolean>((props as any)?.liked ?? false);
  const [likeCount, setLikeCount] = useState<number>(props.likeCount ?? 0);
  const [liking, setLiking] = useState(false);

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(menuRef, () => setOpenMenuId(null));

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [selectedComment, setSelectedComment] =
    useState<CorrectionCommentDTO | null>(null);

  const [isPostingComment, setIsPostingComment] = useState(false);

  const {
    mutate: fetchComments,
    data: listData,
    isPending: listLoading,
  } = useGetCorrectionComments();

  // ✅ 1. usePostCorrectionComment 훅이 객체를 반환하지 않는 문제를 해결합니다.
  const postCommentMutate = usePostCorrectionComment();

  const { mutate: deleteComment, isPending: isDeleting } = useMutation({
    mutationFn: (commentId: number) =>
      deleteCorrectionComment({ correctionId: props.correctionId, commentId }),
    onSuccess: () => {
      setShowDeleteModal(false);
      fetchComments({ correctionId: props.correctionId, page: 1, size: 100 });
    },
    onError: (err) => {
      console.error("❌ 댓글 삭제 실패:", err);
      alert(t.DeleteCommentFail ?? "댓글 삭제에 실패했습니다.");
    },
  });

  const comments: CorrectionCommentDTO[] = useMemo(
    () =>
      ((listData as CorrectionCommentGetResponseDTO | undefined)?.result
        ?.contents ?? []) as CorrectionCommentDTO[],
    [listData]
  );

  const total: number = useMemo(() => {
    const totalFromServer = (
      listData as CorrectionCommentGetResponseDTO | undefined
    )?.result?.totalElements;
    return typeof totalFromServer === "number"
      ? totalFromServer
      : props.commentCount ?? 0;
  }, [listData, props.commentCount]);

  useEffect(() => {
    if (openCorrectionReply) {
      fetchComments({ correctionId: props.correctionId, page: 1, size: 100 });
    }
  }, [openCorrectionReply, props.correctionId, fetchComments]);

  useEffect(() => {
    if (props?.correctionId && !listData) {
      fetchComments({ correctionId: props.correctionId, page: 1, size: 1 });
    }
  }, [props.correctionId, listData, fetchComments]);

  const handleOpenDeleteModal = (comment: CorrectionCommentDTO) => {
    setSelectedComment(comment);
    setShowDeleteModal(true);
    setOpenMenuId(null);
  };
  const handleConfirmDelete = () => {
    if (selectedComment) deleteComment(selectedComment.commentId);
  };

  const handleOpenReportModal = (comment: CorrectionCommentDTO) => {
    setSelectedComment(comment);
    setShowReportModal(true);
    setOpenMenuId(null);
  };
  const handleConfirmReport = () => {
    if (!reportReason.trim()) {
      alert(t.reportReasonPlaceholder);
      return;
    }
    // ✅ 신고 API가 없으므로 UI만 처리합니다.
    alert(`(UI) 신고가 접수되었습니다.\n사유: ${reportReason}`);
    setShowReportModal(false);
    setReportReason("");
  };

  const _toggleCorrectionReply = () => setOpenCorrectionReply((prev) => !prev);

  const _handleCommentSubmit = () => {
    const content = commentText.trim();
    if (!content || isPostingComment) return;

    setIsPostingComment(true);
    const body: CorrectionCommentRequestDTO = { content };

    postCommentMutate.mutate(
      { correctionId: String(props.correctionId), ...body },
      {
        onSuccess: () => {
          setCommentText("");
          fetchComments({
            correctionId: props.correctionId,
            page: 1,
            size: 100,
          });
        },
        onError: (err) => {
          console.error("댓글 작성 실패:", err);
          alert("댓글 작성에 실패했습니다.");
        },
        onSettled: () => {
          setIsPostingComment(false);
        },
      }
    );
  };

  const _handleToggleLike = async () => {
    if (liking) return;
    setLiking(true);
    const prevLiked = liked;
    const prevCount = likeCount;
    setLiked(!prevLiked);
    setLikeCount(prevLiked ? prevCount - 1 : prevCount + 1);
    try {
      const { data } = await axiosInstance.post<CorrectionLikeResponseDTO>(
        `/corrections/${props.correctionId}/likes`
      );
      if (data?.result) {
        setLiked(data.result.liked);
        setLikeCount(data.result.likeCount);
      }
    } catch {
      setLiked(prevLiked);
      setLikeCount(prevCount);
    } finally {
      setLiking(false);
    }
  };

  return (
    <div className="w-60 bg-white rounded-[10px] border border-gray-300 p-4">
      <div
        onClick={() => navigate(`/diaries/member/${props.memberProfile.id}`)}
        className="cursor-pointer"
      >
        <ProfileComponent
          member={{ ...props.memberProfile }}
          createdAt={props.createdAt}
        />
      </div>

      <div className="border-t border-gray-200 my-4" />

      <div className="flex flex-col gap-2 text-body2">
        <p className="font-medium break-words">{props.original}</p>
        <div className="flex gap-2 items-center">
          <div className="w-1 h-5 bg-[#4170FE]" />
          <p className="text-[#4170FE] font-medium break-words">
            {props.corrected}
          </p>
        </div>
        <p className="break-words">{props.commentText}</p>
      </div>

      <div className="flex justify-end items-center text-gray-700 text-body2 gap-2 pt-4">
        <button
          onClick={_toggleCorrectionReply}
          className="flex items-center gap-1 cursor-pointer p-1"
        >
          <img
            src={
              openCorrectionReply
                ? "/images/commentIcon.svg"
                : "/images/CommonComponentIcon/CommentIcon.svg"
            }
            className="w-4 h-4"
            alt="댓글"
          />
          <p>{total}</p>
        </button>
        <button
          onClick={_handleToggleLike}
          disabled={liking}
          className="flex items-center gap-1 p-1 rounded-[5px] disabled:opacity-60"
          aria-pressed={liked}
        >
          <img
            src={
              liked
                ? "/images/CommonComponentIcon/LikeFullIcon.svg"
                : "/images/CommonComponentIcon/LikeIcon.svg"
            }
            className="w-5 h-5 transition-transform cursor-pointer"
            alt="좋아요"
            style={liked ? { filter: RED_FILTER } : undefined}
          />
          <p>{likeCount}</p>
        </button>
      </div>

      {openCorrectionReply && (
        <div>
          <div className="border-t border-gray-200 my-3" />
          {listLoading && !comments.length ? (
            <LoadingModal />
          ) : (
            <ul className="flex flex-col gap-3 mb-3">
              {comments.map((c) => {
                const isOwner =
                  Number(getLocalStorageItem("userId")) === Number(c.memberId);
                return (
                  <li key={c.commentId} className="flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div
                        onClick={() =>
                          navigate(`/diaries/member/${c.memberId}`)
                        }
                        className="flex-1 cursor-pointer min-w-0"
                      >
                        <ProfileComponent
                          member={{
                            memberId: c.memberId,
                            username: c.username,
                            nickname: c.nickname,
                            profileImageUrl: c.profileImage,
                          }}
                          createdAt={c.createdAt}
                        />
                      </div>
                      <div className="relative flex-shrink-0" ref={menuRef}>
                        <img
                          src="/images/more_options.svg"
                          className="w-5 h-5 cursor-pointer ml-2"
                          alt="더보기"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(
                              openMenuId === c.commentId ? null : c.commentId
                            );
                          }}
                        />
                        {openMenuId === c.commentId && (
                          <div className="absolute top-6 right-0 bg-white border border-gray-300 rounded-md shadow-lg w-28 z-10">
                            {isOwner ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenDeleteModal(c);
                                }}
                                disabled={isDeleting}
                                className="w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 text-left cursor-pointer disabled:opacity-50"
                              >
                                {t.DeleteDiary}
                              </button>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenReportModal(c);
                                }}
                                className="w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 text-left cursor-pointer"
                              >
                                {t.ReportContent}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 ml-2">
                      <p className="text-body2 whitespace-pre-wrap break-words">
                        {c.content}
                      </p>
                    </div>
                    <div className="border-t border-gray-200 my-2" />
                  </li>
                );
              })}
            </ul>
          )}

          <div className="flex gap-2">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={t.CommentPlaceholder}
              className="flex-1 bg-gray-200 text-sm text-gray-800 resize-none rounded-[5px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-60"
              rows={1}
              disabled={isPostingComment}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  _handleCommentSubmit();
                }
              }}
            />
            <button
              onClick={_handleCommentSubmit}
              disabled={isPostingComment || !commentText.trim()}
              className="w-12 text-caption bg-black rounded-[5px] text-white cursor-pointer hover:scale-105 duration-300 disabled:opacity-60 disabled:hover:scale-100"
            >
              {isPostingComment ? t.posting : t.post}
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && selectedComment && (
        <AlertModal
          title={t.DeleteCommentAlert}
          onClose={() => setShowDeleteModal(false)}
          confirmText={t.DeleteDiary ?? "삭제"}
          onConfirm={handleConfirmDelete}
          alertMessage=""
        />
      )}
      {showReportModal && selectedComment && (
        <AlertModal
          title={t.ReportContent}
          onClose={() => setShowReportModal(false)}
          description={t.AlertDescription}
          confirmText={t.AlertReport}
          onConfirm={handleConfirmReport}
          onInputChange={setReportReason}
          inputValue={reportReason}
          alertMessage=""
        />
      )}
    </div>
  );
};

export default CorrectionsInDiaryDetail;
