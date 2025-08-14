import { useEffect, useMemo, useState } from "react";
import ProfileComponent from "../Common/ProfileComponent";
import type { ContentsDTO } from "../../utils/types/correction";
import { useGetCorrectionComments } from "../../hooks/mutations/CorrectionComment/useGetCorrectionComments";
import { usePostCorrectionComment } from "../../hooks/mutations/CorrectionComment/usePostCorrectionComments";
import LoadingModal from "../Common/LoadingModal";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { axiosInstance } from "../../apis/axios"; // ✅ 다른 파일 수정 없이 여기서 바로 호출

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

// ✅ 빨간색 채움 필터 (원본 SVG/PNG에 붉은 톤 입힘)
const RED_FILTER =
  "invert(16%) sepia(97%) saturate(7471%) hue-rotate(356deg) brightness(96%) contrast(104%)";

const CorrectionsInDiaryDetail = ({ props }: CorrectionsInDiaryDetailProps) => {
  const [openCorrectionReply, setOpenCorrectionReply] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { language } = useLanguage();
  const t = translate[language];

  // ✅ 좋아요 상태 (props에 liked가 없을 수 있으니 안전 디폴트)
  const [liked, setLiked] = useState<boolean>((props as any)?.liked ?? false);
  const [likeCount, setLikeCount] = useState<number>(props.likeCount ?? 0);
  const [liking, setLiking] = useState(false);

  // 댓글 목록
  const {
    mutate: fetchComments,
    data: listData,
    isPending: listLoading,
  } = useGetCorrectionComments();

  // 댓글 등록
  const { mutate: postComment, isPending: posting } =
    usePostCorrectionComment();

  // 서버에서 받은 댓글 배열
  const comments = useMemo(() => listData?.result?.content ?? [], [listData]);

  // 총 댓글 수
  const total = listData?.result?.totalElements ?? props.commentCount ?? 0;

  // 댓글 열릴 때 목록 불러오기
  useEffect(() => {
    if (openCorrectionReply) {
      fetchComments({
        correctionId: props.correctionId,
        page: 1,
        size: 20,
      });
    }
  }, [openCorrectionReply, props.correctionId, fetchComments]);

  const _toggleCorrectionReply = () => {
    setOpenCorrectionReply((prev) => !prev);
  };

  const _handleCommentSubmit = () => {
    const content = commentText.trim();
    if (!content) return;

    postComment(
      { correctionId: String(props.correctionId), content },
      {
        onSuccess: () => {
          setCommentText("");
          // 등록 성공 후 목록 새로고침
          fetchComments({
            correctionId: props.correctionId,
            page: 1,
            size: 20,
          });
        },
      }
    );
  };

  // ✅ 좋아요 토글 (POST 한 엔드포인트에 맞춤, 낙관적 업데이트 + 롤백)
  const _handleToggleLike = async () => {
    if (liking) return;
    setLiking(true);

    const prevLiked = liked;
    const prevCount = likeCount;

    // 낙관적 업데이트
    setLiked(!prevLiked);
    setLikeCount(prevLiked ? prevCount - 1 : prevCount + 1);

    try {
      const { data } = await axiosInstance.post<CorrectionLikeResponseDTO>(
        `/corrections/${props.correctionId}/likes`
      );
      if (data?.result) {
        // 서버 authoritative 값으로 동기화
        setLiked(data.result.liked);
        setLikeCount(data.result.likeCount);
      }
    } catch {
      // 실패 시 롤백
      setLiked(prevLiked);
      setLikeCount(prevCount);
    } finally {
      setLiking(false);
    }
  };

  return (
    <div className="w-60 bg-white rounded-[10px] border border-gray-300 p-4">
      {/* 프로필 */}
      <ProfileComponent member={props.member} createdAt={props.createdAt} />

      {/* 구분선 */}
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
          <p>{total}</p>
        </button>

        <button
          onClick={_handleToggleLike}
          disabled={liking}
          className={`flex items-center gap-1 p-1 rounded-[5px] disabled:opacity-60`}
          aria-pressed={liked}
        >
          {/* ✅ 원래 이미지 사용 + 좋아요면 빨간 채움 */}
          <img
            src={
              liked
                ? "/images/CommonComponentIcon/LikeFullIcon.svg" // 꽉 찬 하트 원본
                : "/images/CommonComponentIcon/LikeIcon.svg"      // 테두리 하트 원본
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

          {/* 목록 */}
          {listLoading ? (
            <LoadingModal />
          ) : (
            <ul className="flex flex-col gap-3 mb-3">
              {comments.map((c /* : CorrectionCommentDTO */) => (
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
                    <p className="text-body2 whitespace-pre-wrap">
                      {c.content}
                    </p>
                  </div>
                </li>
              ))}
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
