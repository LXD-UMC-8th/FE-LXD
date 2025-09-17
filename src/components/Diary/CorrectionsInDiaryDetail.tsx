import { useEffect, useMemo, useState, useRef } from "react";
import ProfileComponent from "../Common/ProfileComponent";
import type { ContentsDTO } from "../../utils/types/correction";
import { useGetCorrectionComments } from "../../hooks/mutations/CorrectionComment/useGetCorrectionComments";
import { usePostCorrectionComment } from "../../hooks/mutations/CorrectionComment/usePostCorrectionComments";
import LoadingModal from "../Common/LoadingModal";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { axiosInstance, getLocalStorageItem } from "../../apis/axios";
import { useMutation } from "@tanstack/react-query";
import { deleteCorrectionComment } from "../../apis/correctionComment"; // API 함수 임포트
import useOutsideClick from "../../hooks/useOutsideClick";

import type {
  CorrectionCommentDTO,
  CorrectionCommentGetResponseDTO,
  CorrectionCommentGetRequestDTO,
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
  const [openCorrectionReply, setOpenCorrectionReply] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { language } = useLanguage();
  const t = translate[language];
  const navigate = useNavigate();

  const [liked, setLiked] = useState<boolean>((props as any)?.liked ?? false);
  const [likeCount, setLikeCount] = useState<number>(props.likeCount ?? 0);
  const [liking, setLiking] = useState(false);
  
  // 더보기 메뉴 상태 관리를 위한 state 및 ref 추가
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(menuRef, () => setOpenMenuId(null));

  const {
    mutate: fetchComments,
    data: listData,
    isPending: listLoading,
  } = useGetCorrectionComments();

  const { mutate: postComment, isPending: posting } =
    usePostCorrectionComment();

  // 댓글 삭제를 위한 useMutation 훅 추가
  const { mutate: deleteComment, isPending: isDeleting } = useMutation({
    mutationFn: (commentId: number) =>
      deleteCorrectionComment({
        correctionId: props.correctionId,
        commentId,
      }),
    onSuccess: () => {
      // 삭제 성공 시 댓글 목록을 다시 불러옵니다.
      fetchComments({
        correctionId: props.correctionId,
        page: 1,
        size: 100, // 페이지네이션에 맞게 조정
      });
      setOpenMenuId(null); // 메뉴 닫기
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
    if (typeof totalFromServer === "number") return totalFromServer;
    if (typeof props.commentCount === "number") return props.commentCount;
    return 0;
  }, [listData, props.commentCount]);

  useEffect(() => {
    if (openCorrectionReply) {
      const req: CorrectionCommentGetRequestDTO = {
        correctionId: props.correctionId,
        page: 1,
        size: 100,
      };
      fetchComments(req);
    }
  }, [openCorrectionReply, props.correctionId, fetchComments]);

  useEffect(() => {
    if (props?.correctionId && total === 0) { // 댓글 수가 0일 때만 초기 카운트 fetch
      const req: CorrectionCommentGetRequestDTO = {
        correctionId: props.correctionId,
        page: 1,
        size: 1,
      };
      fetchComments(req);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.correctionId]);

  const _toggleCorrectionReply = () => {
    setOpenCorrectionReply((prev) => !prev);
  };

  const _handleCommentSubmit = () => {
    const content = commentText.trim();
    if (!content) return;
    const body: CorrectionCommentRequestDTO = { content };
    postComment(
      { correctionId: String(props.correctionId), ...body },
      {
        onSuccess: () => {
          setCommentText("");
          fetchComments({ correctionId: props.correctionId, page: 1, size: 100 });
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

  const handleDeleteComment = (commentId: number) => {
    if (window.confirm(t.DeleteCommentAlert ?? "정말로 댓글을 삭제하시겠습니까?")) {
      deleteComment(commentId);
    }
  };

  return (
    <div className="w-60 bg-white rounded-[10px] border border-gray-300 p-4">
      <div onClick={() => navigate(`/diaries/member/${props.member.memberId}`)} className="cursor-pointer">
        <ProfileComponent member={props.member} createdAt={props.createdAt} />
      </div>

      <div className="border-t border-gray-200 my-4" />

      <div className="flex flex-col gap-2 text-body2">
        <p className="font-medium">{props.original}</p>
        <div className="flex gap-2 items-center">
          <div className="w-1 h-5 bg-[#4170FE]" />
          <p className="text-[#4170FE] font-medium">{props.corrected}</p>
        </div>
        <p>{props.commentText}</p>
      </div>

      <div className="flex justify-end items-center text-gray-700 text-body2 gap-2 pt-4">
        <button
          onClick={_toggleCorrectionReply}
          className={`flex items-center gap-1 cursor-pointer p-1 ${
            openCorrectionReply ? "bg-gray-300 text-black rounded-[5px]" : ""
          }`}
        >
          <img
            src={openCorrectionReply ? "/images/commentIcon.svg" : "/images/CommonComponentIcon/CommentIcon.svg"}
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
            src={liked ? "/images/CommonComponentIcon/LikeFullIcon.svg" : "/images/CommonComponentIcon/LikeIcon.svg"}
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
                const isOwner = Number(getLocalStorageItem("userId")) === Number(c.memberId);
                return (
                  <li key={c.commentId} className="flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div
                        onClick={() => navigate(`/diaries/member/${c.memberId}`)}
                        className="flex-1 cursor-pointer"
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
                      {isOwner && (
                        <div className="relative flex-shrink-0" ref={menuRef}>
                          <img
                            src="/images/more_options.svg"
                            className="w-5 h-5 cursor-pointer"
                            alt="더보기"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === c.commentId ? null : c.commentId);
                            }}
                          />
                          {openMenuId === c.commentId && (
                            <div className="absolute top-6 right-0 bg-white border border-gray-300 rounded-md shadow-lg w-24 z-10">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteComment(c.commentId);
                                }}
                                disabled={isDeleting}
                                className="w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 text-left cursor-pointer disabled:opacity-50"
                              >
                                {t.DeleteDiary ?? "삭제하기"}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 ml-2">
                      <p className="text-body2 whitespace-pre-wrap">{c.content}</p>
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
              className="w-45 bg-gray-200 text-sm text-gray-800 resize-none rounded-[5px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-60"
              rows={1}
              disabled={posting}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  _handleCommentSubmit();
                }
              }}
            />
            <button
              onClick={_handleCommentSubmit}
              disabled={posting || !commentText.trim()}
              className="w-12 text-caption bg-black rounded-[5px] text-white cursor-pointer hover:scale-105 duration-300 disabled:opacity-60 disabled:hover:scale-100"
            >
              {posting ? t.posting : t.post}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CorrectionsInDiaryDetail;