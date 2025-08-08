import { useState } from "react";
import ProfileComponent from "../Common/ProfileComponent";
import type { ContentsDTO } from "../../utils/types/correction";
// import { usePostLike } from "../../hooks/mutations/usePostLike";

const CorrectionsInDiaryDetail = ({ props }: { props: ContentsDTO }) => {
  const [openCorrectionReply, setOpenCorrectionReply] = useState(false);
  const [commentText, setCommentText] = useState("");
  // const { mutate: likeCorrection, isPending } = usePostLike();

  const _toggleCorrectionReply = () => {
    setOpenCorrectionReply((prev) => !prev);
  };

  const _handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    console.log("댓글 등록", commentText);
    setCommentText("");
  };

  return (
    <div className="w-60 bg-white rounded-[10px] border border-gray-300 p-4">
      {/* 프로필 */}
      <ProfileComponent member={props.member} createdAt={props.createdAt} />

      {/* 구분선 */}
      <div className="border-t border-gray-200 my-4" />

      {/* 교정 내용 */}
      <div className="flex flex-col gap-2 text-body2">
        {/* 원문 */}
        <p className="font-medium">{props.original}</p>

        {/* 수정 문장 */}
        <div className="flex gap-2 items-center">
          <div className="w-1 h-5 bg-[#4170FE]" />
          <p className="text-[#4170FE] font-medium">{props.corrected}</p>
        </div>

        {/* 교정 설명 */}
        <p>{props.commentText}</p>
      </div>

      {/* 댓글 & 좋아요 */}
      <div className="flex justify-end items-center text-gray-700 text-body2 gap-2 pt-4">
        {/* 댓글 버튼 */}
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
          <p>{props.commentCount}</p>
        </button>

        {/* 좋아요 버튼 */}
        <button
          // onClick={() => likeCorrection({ targetType: "corrections", targetId: props.correctionId })}
          // disabled={isPending}
          className="flex items-center gap-1"
        >
          <img
            src="/images/CommonComponentIcon/LikeIcon.svg"
            className="w-4 h-4"
            alt="좋아요 수"
          />
          <p>{props.likeCount}</p>
        </button>
      </div>

      {/* 댓글 입력창 */}
      {openCorrectionReply && (
        <div>
          <div className="border-t border-gray-200 my-3" />
          <div className="flex gap-2">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="댓글을 입력하세요."
              className="w-45 bg-gray-200 text-sm text-gray-800 resize-none rounded-[5px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              rows={1}
            />
            <button
              onClick={_handleCommentSubmit}
              className="w-12 text-caption bg-black rounded-[5px] text-white cursor-pointer hover:scale-105 duration-300"
            >
              등록
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CorrectionsInDiaryDetail;
