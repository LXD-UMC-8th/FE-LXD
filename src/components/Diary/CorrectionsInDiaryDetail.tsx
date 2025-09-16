import { useEffect, useMemo, useState } from "react";
import ProfileComponent from "../Common/ProfileComponent";
import type { ContentsDTO } from "../../utils/types/correction";
import { useGetCorrectionComments } from "../../hooks/mutations/CorrectionComment/useGetCorrectionComments";
import { usePostCorrectionComment } from "../../hooks/mutations/CorrectionComment/usePostCorrectionComments";
import LoadingModal from "../Common/LoadingModal";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { axiosInstance } from "../../apis/axios";

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

  // GET 래핑 훅 (mutate로 호출)
  const {
    mutate: fetchComments,
    data: listData,
    isPending: listLoading,
  } = useGetCorrectionComments();

  // POST 래핑 훅
  const { mutate: postComment, isPending: posting } =
    usePostCorrectionComment();

  // ✅ 서버에서 받은 댓글 배열 (키: contents)
  const comments: CorrectionCommentDTO[] = useMemo(
    () =>
      ((listData as CorrectionCommentGetResponseDTO | undefined)?.result
        ?.contents ?? []) as CorrectionCommentDTO[],
    [listData]
  );

  // ✅ 총 댓글 수: 서버 totalElements > props.commentCount > 0
  const total: number = useMemo(() => {
    const totalFromServer = (
      listData as CorrectionCommentGetResponseDTO | undefined
    )?.result?.totalElements;
    if (typeof totalFromServer === "number") return totalFromServer;
    if (typeof props.commentCount === "number") return props.commentCount;
    return 0;
  }, [listData, props.commentCount]);

  // 열렸을 때 목록(size:10)
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

  // 처음 렌더 때 totalElements 프리페치(size:1)
  useEffect(() => {
    if (props?.correctionId) {
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
      {
        correctionId: String(props.correctionId),
        ...body,
      },
      {
        onSuccess: () => {
          setCommentText("");
          const req: CorrectionCommentGetRequestDTO = {
            correctionId: props.correctionId,
            page: 1,
            size: 100,
          };
          fetchComments(req);
        },
      }
    );
  };

  // 좋아요 토글 (낙관 + 롤백)
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
      {/* 프로필 */}
      <div
        onClick={() => navigate(`/diaries/member/${props.member.memberId}`)}
        className="cursor-pointer"
      >
        <ProfileComponent member={props.member} createdAt={props.createdAt} />
      </div>

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

      {/* 댓글 영역 */}
      {openCorrectionReply && (
        <div>
          <div className="border-t border-gray-200 my-3" />

          {/* 목록 */}
          {listLoading ? (
            <LoadingModal />
          ) : (
            <ul className="flex flex-col gap-3 mb-3">
              {comments.map((c) => (
                <li key={c.commentId} className="flex flex-col gap-2">
                  <div
                    onClick={() => navigate(`/diaries/member/${c.memberId}`)}
                    className="cursor-pointer"
                  >
                    <ProfileComponent
                      member={{
                        memberId: c.memberId,
                        username: c.username,
                        nickname: c.nickname,
                        // API: profileImage  → UI: profileImageUrl 로 매핑
                        profileImageUrl: c.profileImage,
                      }}
                      createdAt={c.createdAt}
                    />
                  </div>
                  <div className="flex-1 ml-2">
                    <p className="text-body2 whitespace-pre-wrap">
                      {c.content}
                    </p>
                  </div>
                  <div className="border-t border-gray-200 my-2" />
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
              {posting ? t.posting : t.post}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CorrectionsInDiaryDetail;
