import { useState } from "react";
import ProfileComponent from "../ProfileComponent";

const CorrectionsInFeedDetail = () => {
    const [ openCorrectoinReply, setOpenCorrectionReply ] = useState(false);

    const _toggleCorrectionReply = () => {
        setOpenCorrectionReply((prev) => !prev);
    };
  return (
    <div className="w-60 bg-white rounded-[10px] border border-gray-300 p-4">
        <ProfileComponent />
            <div className="border-t border-gray-200 my-4"/>
            <div className="flex flex-col gap-2 text-body2">
              <p className="font-medium">오늘는 피자데이입니다</p>
              <div className="flex gap-2 items-center">
                <div className="w-1 h-5 bg-[#4170FE]"/>
                <p className="text-[#4170FE] font-medium">오늘은 피자데이입니다</p>
              </div>
              <p className="">‘오늘’ 뒤의 보조사로는 ‘는’ 보다는 ‘은’이 더 적합합니다. 오늘에 종성이 있기 때문인데요. 앞말에 종성이 있다면 그 뒤에는 은이 와야합니다</p>
            </div>
            <div className="flex justify-end items-center text-gray-700 text-body2 gap-2 pt-4">
              {/* 댓글 */}
              <button 
                onClick={_toggleCorrectionReply}
                className={`flex items-center gap-1 cursor-pointer p-1 ${
                  openCorrectoinReply ? "bg-gray-300 text-black rounded-[5px]" : ""
                }`}
              > 
                <img 
                  src={
                    openCorrectoinReply
                    ? "/images/commentIcon.svg"
                    : "/images/CommonComponentIcon/CommentIcon.svg"
                  }
                  className="w-4 h-4"
                />
                <p>180</p>
              </button>
              {/* 좋아요 */}
              <div className="flex items-center gap-1">
                <img 
                  src="/images/CommonComponentIcon/LikeIcon.svg"
                  className="w-4 h-4"
                />
                <p>89</p>
              </div>
            </div>
            {openCorrectoinReply && (
              <div>
                <div className="border-t border-gray-200 my-3"/>
                <div className="flex gap-2">
                  <textarea
                      placeholder="댓글을 입력하세요."
                      className="w-45 bg-gray-200 text-sm text-gray-800 resize-none rounded-[5px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      rows={1}
                    />
                    <button className="w-12 text-caption bg-black rounded-[5px] text-white cursor-pointer hover:scale-105 duration-300">
                      등록
                    </button>
                </div>
              </div>
            )}
        </div>
  )
}

export default CorrectionsInFeedDetail
