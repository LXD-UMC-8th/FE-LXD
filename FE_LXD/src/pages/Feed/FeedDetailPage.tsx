import { useState } from "react";
import ProfileComponent from "../../components/ProfileComponent";
import PrevButton from "../../components/PrevButton";

const FeedDetailPage = () => {
  const [openReplyIndex, setOpenReplyIndex] = useState<number | null>(null);

  const toggleReplyInput = (idx: number) => {
    setOpenReplyIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="w-full max-w-[750px] mx-auto px-6 pt-6">
      {/* ← 뒤로가기 + 교정하기 */}
      <div className="mb-4 flex items-center justify-between">
        <PrevButton navigateURL="/feed" />
        <button className="flex items-center justify-center bg-[#4170FE] text-[#F1F5FD] font-pretendard font-bold text-sm h-[43px] w-[118.7px] rounded-[5px] px-[12px] pr-[20px] gap-[10px] hover:scale-105 duration-300 cursor-pointer">
          <img
            src="/images/correctionpencil.svg"
            alt="교정 아이콘"
            className="w-[20.7px] h-[21.06px]"
          />
          교정하기
        </button>
      </div>
      
      <div className="bg-white p-8 rounded-[10px]">
        {/* 제목 & 상태 */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
            전체공개
          </span>
          <h1 className="text-subhead2 font-semibold">제목</h1>
          <span className="text-blue-600 text-body2 font-medium ml-auto">한국어</span>
        </div>

        {/* 작성자 + 우측 정보 */}
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <ProfileComponent />
          <div className="flex items-center gap-3 text-caption text-gray-700 pt-3">
            {/* 댓글 수 */}
            <div className="flex gap-1">
              <img 
                src="/images/CommonComponentIcon/CommentIcon.svg"
                className="w-4 h-4"
              />
              <span>180</span>
            </div>
            {/* 좋아요 수 */}
            <div className="flex gap-1">
              <img 
                src="/images/CommonComponentIcon/LikeIcon.svg"
                className="w-4 h-4"
              />
              <span>89</span>
            </div>
            {/* 교정 수 */}
            <div className="flex gap-1">
              <img 
                src="/images/CommonComponentIcon/CorrectIcon.svg"
                className="w-4 h-4"
              />
              <span>5</span>
            </div>
            
            {/* 더보기 */}
            <img 
              src="/images/more_options.svg" 
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 my-5"/>

        {/* 본문 이미지 + 텍스트 */}
        <div className="text-center mx-20">
          <div className="w-full h-52 bg-gray-200 rounded-[10px] mb-4" />
          <p className="text-body2 leading-relaxed text-gray-800 whitespace-pre-line">
            요즘 하루가 정말 빨리 지나간다. 오늘도 눈 뜨고 정신 차려보니 벌써
            저녁. 오랜만에 간단하게 집 정리하고, 밀린 설거지 해결했다. 생각보다
            시간이 오래 걸려서 커피 한 잔 마시고 나니 벌써 점심시간. 점심은
            냉장고에 남아있던 재료들로 대충 볶음밥. 의외로 낫다. 오후엔 컴퓨터
            앞에 앉아서 이것저것 정리했다.
          </p>
        </div>

        <div className="border-t border-gray-200 my-5"/>

        {/* 댓글 전체 래퍼 카드 */}
        <div className="mt-10 bg-white rounded-[10px] p-6">
          {/* 댓글 헤더 */}
          <div className="flex items-center gap-2 text-black font-semibold text-[17px] mb-5">
            <img
              src="/images/commentIcon.svg"
              alt="댓글 아이콘"
              className="w-[24px] h-[24px]"
            />
            <span>댓글 (5)</span>
          </div>

          {/* 댓글 입력창 */}
          <div className="mb-5">
            <textarea
              placeholder="댓글을 입력하세요."
              className="w-full text-sm text-gray-800 bg-gray-50 resize-none border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
              rows={4}
            />
            <div className="flex justify-end mt-3">
              <button className="bg-gray-900 text-white text-sm px-4 py-[6px] rounded-lg text-caption font-semibold hover:bg-gray-800 hover:scale-105 transition-all duration-300 cursor-pointer">
                등록
              </button>
            </div>
          </div>

          {/* 댓글 리스트 */}
          {[1, 2].map((_, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-5 mb-6"
            >
              <div className="flex items-center gap-3 mb-2">
                {/* 댓글 작성자 프로필 */}
                <div className="w-9 h-9 rounded-full bg-gray-300" />
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-body2">김태현</span>
                  <div className="w-px h-5 bg-gray-500"/>
                  <span className="text-xs text-gray-600">@kimtaehyun</span>
                  <p className="text-caption text-gray-500">0분전</p>
                </div>
              </div>
              <p className="text-body2 text-black whitespace-pre-line leading-relaxed mb-4">
                댓글 내용
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                <div
                  className={`flex items-center gap-1 cursor-pointer p-1
                    ${openReplyIndex === idx ? "bg-gray-200 rounded-[5px] text-black" : ""}`}
                  onClick={() => toggleReplyInput(idx)}
                >
                  <img
                    src="/images/commentIcon.svg"
                    alt="댓글 수"
                    className="w-4 h-4"
                  />
                  <span>180</span>
                </div>
                <div className="flex items-center gap-1">
                  <img
                    src="/images/CommonComponentIcon/LikeIcon.svg"
                    alt="좋아요 수"
                    className="w-4 h-4"
                  />
                  <span>89</span>
                </div>
              </div>

              {/* 대댓글 입력창 (조건부 렌더링) */}
              {openReplyIndex === idx && (
                <div className="mt-3">
                  <textarea
                    placeholder="답글을 입력하세요."
                    className="w-full bg-gray-50 text-sm text-gray-800 resize-none border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <button className="bg-gray-900 text-white text-sm px-4 py-[6px] rounded-lg text-caption font-semibold hover:bg-gray-800 hover:scale-105 transition-all duration-300 cursor-pointer">
                      등록
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default FeedDetailPage;
