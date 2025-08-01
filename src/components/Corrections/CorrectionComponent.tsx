import { useState } from "react";
import ProfileInCorrections from "./ProfileInCorrections";
import type { CorrectionsDetailDTO } from "../../utils/types/correction";

interface Props {
  correction: CorrectionsDetailDTO;
}

const CorrectionComponent = ({ correction }: Props) => {
  const [liked, setLiked] = useState(false);
  const [openCorrectoinReply, setOpenCorrectionReply] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comments, _setcomments] = useState([`댓글 내용1`, `댓글 내용2`]);

  const _handleLikeToggle = () => {
    setLiked((prev) => !prev);
  };

  const _toggleCorrectionReply = () => {
    setOpenCorrectionReply((prev) => !prev);
  };

  return (
    <div
      className={`w-300 bg-white rounded-[10px] border border-gray-300 ${
        openCorrectoinReply ? "h-[570px]" : "h-[380px]"
      }`}
    >
      <div className="flex flex-col">
        <div className="px-5 pt-5">
          <ProfileInCorrections 
            member={correction.member}
            createdAt={correction.createdAt}
          />
        </div>

        {/* 본문 */}
        <div className="flex flex-col gap-3 px-8 pt-2">
          <div className="flex flex-col gap-2">
            <p className="text-body1 font-semibold">{correction.original}</p>
            <div className="flex gap-2">
              <div className="w-1 h-6 bg-primary-500" />
              <p className="text-body1 font-semibold text-primary-500">
                {correction.corrected}
              </p>
            </div>
          </div>
          <p className="text-body2">
            {correction.commentText}
          </p>
        </div>

        {/* 메모 + 좋아요 */}
        <div className="flex items-center text-body2 text-gray-700 gap-3 ml-auto mr-5 mt-3">
          {/* 메모 */}
          <button
            onClick={_toggleCorrectionReply}
            className={`flex gap-1 p-1 cursor-pointer ${
              openCorrectoinReply ? "bg-gray-300 text-black rounded-[5px]" : ""
            }`}
          >
            <img
              src={
                openCorrectoinReply
                  ? "/images/commentIcon.svg"
                  : "/images/CommonComponentIcon/CommentIcon.svg"
              }
              className="w-5 h-5"
            />
            <p>{correction.commentCount}</p>
          </button>
          {/* 좋아요 */}
          <button className="flex gap-1 p-1">
            <img
              src={
                liked ? "/images/HeartIcon.svg" : "/images/EmptyHeartIcon.svg"
              }
              alt={liked ? "채워진 하트" : "빈 하트"}
              className="w-5 h-5 cursor-pointer"
              onClick={_handleLikeToggle}
            />
            <p>{correction.likeCount}</p>
          </button>
        </div>

        {/* 댓글 */}
        {openCorrectoinReply && (
          <div className="px-10 text-body1">
            {comments.map((comment, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="border-t border-gray-300 mt-5" />
                <div className="flex flex-col">
                  {/* <ProfileInCorrections /> */}
                  <div>{comment}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 메모 */}
        <div className="flex items-center gap-2 mt-5 mx-7">
          <div className="flex-1 flex items-center bg-gray-100 rounded-[5px] border border-gray-300 px-2 py-2 gap-2">
            <img
              src="/images/MemoPlusIcon.svg"
              alt="메모 추가"
              className="w-4 h-4"
            />
            <input
              type="text"
              placeholder="메모를 추가하기"
              className="w-full h-full text-body1 text-black placeholder-gray-400 bg-transparent outline-none"
            />
          </div>
          <button className="px-3 py-2 rounded-[5px] bg-primary-500 text-white whitespace-nowrap text-body1 cursor-pointer hover:bg-blue-600 transition transform-300">
            수정하기
          </button>
        </div>

        <div className="border-t border-gray-300 mt-5" />

        {/* 본문 정보 */}
        <div className="flex items-center gap-3 pt-4 mx-6 mb-4">
          {/* <img 
            src=""
            alt="대표사진"
            className="w-9 h-9 rounded-[4px]"
          /> */}
          <div className="w-9 h-9 bg-gray-300 rounded-[4px]" />
          <p className="text-gray-700 text-body1">#63</p>
          <p className="text-gray-700 text-body1 font-medium">
            그냥 일상 정리하는 글
          </p>
          <p className="ml-auto text-gray-500 text-caption">
            2025. 06. 16 오후 02:44
          </p>
        </div>
      </div>
    </div>
  );
};

export default CorrectionComponent;
