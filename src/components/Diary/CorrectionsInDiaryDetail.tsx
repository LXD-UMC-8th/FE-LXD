import { useEffect, useMemo, useState } from "react";
import ProfileComponent from "../Common/ProfileComponent";
import type { ContentsDTO } from "../../utils/types/correction";
import { useGetCorrectionComments } from "../../hooks/mutations/CorrectionComment/useGetCorrectionComments";
import { usePostCorrectionComment } from "../../hooks/mutations/CorrectionComment/usePostCorrectionComments";
import LoadingModal from "../Common/LoadingModal";

type CorrectionsInDiaryDetailProps = {
  props: ContentsDTO;
};

const CorrectionsInDiaryDetail = ({ props }: CorrectionsInDiaryDetailProps) => {
  const [openCorrectionReply, setOpenCorrectionReply] = useState(false);
  const [commentText, setCommentText] = useState("");

  // 댓글 목록
  const {
    mutate: fetchComments,
    data: listData,
    isPending: listLoading,
  } = useGetCorrectionComments();

  // 댓글 등록
  const { mutate: postComment, isPending: posting } = usePostCorrectionComment();

  // 서버에서 받은 댓글 배열
  const comments = useMemo(
    () =>
      listData?.result?.contents ??
      listData?.result?.content ??
      [],
    [listData]
  );
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

        <button className="flex items-center gap-1">
          <img
            src="/images/CommonComponentIcon/LikeIcon.svg"
            className="w-4 h-4"
            alt="좋아요 수"
          />
          <p>{props.likeCount}</p>
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
                    <p className="text-body2 whitespace-pre-wrap">{c.content}</p>
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
              placeholder="댓글을 입력하세요."
              className="w-45 bg-gray-200 text-sm text-gray-800 resize-none rounded-[5px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-60"
              rows={1}
              disabled={posting}
              onKeyDown={(e) => {
                if(e.key === "Enter" && !e.shiftKey) {
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
