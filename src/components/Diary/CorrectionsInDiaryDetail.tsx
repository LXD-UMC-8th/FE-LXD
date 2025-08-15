// src/components/Diary/CorrectionsInDiaryDetail.tsx
import { useEffect, useMemo, useState } from "react";
import ProfileComponent from "../Common/ProfileComponent";
import type { ContentsDTO } from "../../utils/types/correction";
import { useGetCorrectionComments } from "../../hooks/mutations/CorrectionComment/useGetCorrectionComments";
import { usePostCorrectionComment } from "../../hooks/mutations/CorrectionComment/usePostCorrectionComments";
import LoadingModal from "../Common/LoadingModal";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { axiosInstance } from "../../apis/axios";

type CorrectionsInDiaryDetailProps = { props: ContentsDTO };

type CorrectionLikeResponseDTO = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: { correctionId: number; memberId: number; likeCount: number; liked: boolean };
};

// 댓글 응답(result) 포맷 2종 커버
type CommentResult =
  | { contents: any[]; totalElements: number }
  | { content: any[]; totalElements: number };

// 빨간색 채움(원본 아이콘 유지 + CSS 필터로 붉은 톤)
const RED_FILTER =
  "invert(16%) sepia(97%) saturate(7471%) hue-rotate(356deg) brightness(96%) contrast(104%)";

// 안전 추출 유틸
const pickBool = (obj: any, keys: string[], fallback = false) =>
  keys.reduce<boolean>((acc, k) => (typeof obj?.[k] === "boolean" ? obj[k] : acc), fallback);

const pickNum = (obj: any, keys: string[], fallback = 0) =>
  keys.reduce<number>((acc, k) => (typeof obj?.[k] === "number" ? obj[k] : acc), fallback);

const CorrectionsInDiaryDetail = ({ props }: CorrectionsInDiaryDetailProps) => {
  const { language } = useLanguage();
  const t = translate[language];

  // ===== 댓글 수(초깃값: props → 없으면 0) =====
  const [commentCount, setCommentCount] = useState<number>(
    pickNum(props as any, ["commentCount", "commentsCount", "comment_counts"], 0)
  );
  const [openCorrectionReply, setOpenCorrectionReply] = useState(false);
  const [commentText, setCommentText] = useState("");

  // 댓글 목록 가져오기/등록
  const {
    mutate: fetchComments,
    data: listData,
    isPending: listLoading,
  } = useGetCorrectionComments();
  const { mutate: postComment, isPending: posting } = usePostCorrectionComment();

  // 응답에서 목록 추출 (contents | content 모두 지원)
  const res = listData?.result as CommentResult | undefined;
  const comments = useMemo(() => {
    if (!res) return [];
    return "contents" in res ? res.contents : res.content;
  }, [res]);

  // 서버에서 받아오면 총 개수 동기화
  useEffect(() => {
    const total = res ? ("totalElements" in res ? res.totalElements : undefined) : undefined;
    if (typeof total === "number") setCommentCount(total);
  }, [res]);

  // 초기 렌더 시 총 개수만 가볍게 선조회(size=1)
  useEffect(() => {
    const initialFromProps =
      (props as any)?.commentCount ??
      (props as any)?.commentsCount ??
      (props as any)?.comment_counts;

    if (typeof initialFromProps === "number" && initialFromProps > 0) return;

    fetchComments(
      { correctionId: props.correctionId, page: 1, size: 1 },
      {
        onSuccess: (d: any) => {
          const total = d?.result?.totalElements ?? 0;
          setCommentCount(total);
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.correctionId]);

  // 댓글 패널 열릴 때 목록 조회
  useEffect(() => {
    if (openCorrectionReply) {
      fetchComments({ correctionId: props.correctionId, page: 1, size: 20 });
    }
  }, [openCorrectionReply, props.correctionId, fetchComments]);

  const _toggleCorrectionReply = () => setOpenCorrectionReply((prev) => !prev);

  const _handleCommentSubmit = () => {
    const content = commentText.trim();
    if (!content) return;

    // 낙관적 +1 후 서버 동기화
    setCommentCount((c) => c + 1);
    postComment(
      { correctionId: String(props.correctionId), content },
      {
        onSuccess: () => {
          setCommentText("");
          fetchComments({ correctionId: props.correctionId, page: 1, size: 20 });
        },
        onError: () => {
          setCommentCount((c) => Math.max(0, c - 1));
        },
      }
    );
  };

  // ===== 좋아요(초깃값: 가능한 키에서 안전 추출) =====
  const [liked, setLiked] = useState<boolean>(
    pickBool(props as any, ["liked", "isLiked", "likedByMe", "memberLiked"], false)
  );
  const [likeCount, setLikeCount] = useState<number>(
    pickNum(props as any, ["likeCount", "likes", "likesCount"], 0)
  );
  const [liking, setLiking] = useState(false);

  // 서버 응답만 신뢰(낙관적 제거) → 깜빡/되돌림 방지
  const _handleToggleLike = async () => {
    if (liking) return;
    setLiking(true);
    try {
      const { data } = await axiosInstance.post<CorrectionLikeResponseDTO>(
        `/corrections/${props.correctionId}/likes`
      );
      if (data?.result) {
        setLiked(!!data.result.liked);
        setLikeCount(typeof data.result.likeCount === "number" ? data.result.likeCount : likeCount);
      }
    } finally {
      setLiking(false);
    }
  };

  return (
    <div className="w-60 bg-white rounded-[10px] border border-gray-300 p-4">
      {/* 프로필 */}
      <ProfileComponent member={props.member} createdAt={props.createdAt} />

      <div className="border-t border-gray-200 my-4" />

      {/* 교정 본문 */}
      <div className="flex flex-col gap-2 text-body2">
        <p className="font-medium">{props.original}</p>
        <div className="flex gap-2 items-center">
          <div className="w-1 h-5 bg-[#4170FE]" />
          <p className="text-[#4170FE] font-medium">{props.corrected}</p>
        </div>
        <p>{props.commentText}</p>
      </div>

      {/* 댓글 & 좋아요 */}
      <div className="flex justify-end items-center text-gray-700 text-body2 gap-2 pt-4">
        <button
          onClick={_toggleCorrectionReply}
          className={`flex items-center gap-1 cursor-pointer p-1 ${
            openCorrectionReply ? "bg-gray-300 text-black rounded-[5px]" : ""
          }`}
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
          <p>{commentCount}</p>
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
            className={`w-4 h-4 transition-transform ${liked ? "scale-110" : ""}`}
            alt="좋아요"
            style={liked ? { filter: RED_FILTER } : undefined}
          />
          <p className={liked ? "text-red-500" : undefined}>{likeCount}</p>
        </button>
      </div>

      {/* 댓글 영역 */}
      {openCorrectionReply && (
        <div>
          <div className="border-t border-gray-200 my-3" />
          {listLoading ? (
            <LoadingModal />
          ) : (
            <ul className="flex flex-col gap-3 mb-3">
              {comments.map((c: any) => (
                <li key={c.commentId} className="flex flex-col gap-2">
                  <ProfileComponent
                    member={{
                      memberId: c.memberId,
                      username: c.username,
                      nickname: c.nickname,
                      profileImageUrl: c.profileImage,
                    }}
                    createdAt={c.createdAt}
                  />
                  <div className="flex-1 ml-2">
                    <p className="text-body2 whitespace-pre-wrap">{c.content}</p>
                  </div>
                </li>
              ))}
              {comments.length === 0 && (
                <li className="text-sm text-gray-400">첫 댓글을 남겨보세요.</li>
              )}
            </ul>
          )}

          {/* 입력 */}
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
              {posting ? "등록중" : "등록"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CorrectionsInDiaryDetail;
