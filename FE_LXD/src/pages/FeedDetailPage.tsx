import { useState } from "react";
import {  MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeedDetailPage = () => {
  const [openReplyIndex, setOpenReplyIndex] = useState<number | null>(null);

  const toggleReplyInput = (idx: number) => {
    setOpenReplyIndex(prev => (prev === idx ? null : idx));
  };

  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[750px] mx-auto px-6 pt-6">
      {/* ← 뒤로가기 + 교정하기 */}
      <div className="mb-4 flex items-center justify-between">
        <button className="flex items-center text-gray-600 hover:text-black cursor-pointer"
        onClick={() => navigate(-1)}>
          <img
            src="/images/backIcon.svg"
            alt="뒤로가기 아이콘"
            className="w-[11x] h-[22px]"
          />
        </button>
        <button className="flex items-center justify-center bg-[#4170FE] text-[#F1F5FD] font-pretendard font-bold text-sm h-[43px] w-[118.7px] rounded-[5px] px-[12px] pr-[20px] gap-[10px] hover:bg-[#2f5be7] cursor-pointer">
          <img
            src="/images/correctionpencil.svg"
            alt="교정 아이콘"
            className="w-[20.7px] h-[21.06px]"
          />
          교정하기
        </button>
      </div>

      {/* 제목 & 상태 */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
          전체공개
        </span>
        <h1 className="text-lg font-semibold">그냥 일상 정리하는 글</h1>
      </div>

      {/* 작성자 + 우측 정보 */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <div>
            <p className="font-semibold text-black">손지현</p>
            <p className="text-xs text-gray-400">@2jahn</p>
          </div>
          <span className="text-xs text-gray-400 ml-1">2025.06.16 오후 02:44</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>180</span>
          <span>89</span>
          <span>5</span>
          <span className="text-blue-600">한국어</span>
          <MoreHorizontal className="w-4 h-4 cursor-pointer" />
        </div>
      </div>

      {/* 본문 이미지 + 텍스트 */}
      <div className="text-center">
        <div className="w-full h-52 bg-gray-200 rounded mb-4" />
        <p className="text-[15px] leading-relaxed text-gray-800 whitespace-pre-line">
          요즘 하루가 정말 빨리 지나간다.
          오늘도 눈 뜨고 정신 차려보니 벌써 저녁.
          오랜만에 간단하게 집 정리하고, 밀린 설거지 해결했다.
          생각보다 시간이 오래 걸려서 커피 한 잔 마시고 나니 벌써 점심시간.
          점심은 냉장고에 남아있던 재료들로 대충 볶음밥. 의외로 낫다.
          오후엔 컴퓨터 앞에 앉아서 이것저것 정리했다.
        </p>
        <div className="w-full h-36 bg-gray-200 rounded mt-6" />
      </div>

      {/* 댓글 전체 래퍼 카드 */}
      <div className="mt-10 bg-white rounded-xl border border-gray-200 p-6 shadow-md">
        {/* 댓글 헤더 */}
        <div className="flex items-center gap-2 text-black font-semibold text-[17px] mb-5">
          <img src="/images/commentIcon.svg" alt="댓글 아이콘" className="w-[24px] h-[24px]" />
          <span>댓글 (5)</span>
        </div>

        {/* 댓글 입력창 */}
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <textarea
            placeholder="어쩌고 저쩌고 댓글쓰는중"
            className="w-full text-sm text-gray-800 resize-none border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
            rows={4}
          />
          <div className="flex justify-end mt-3">
            <button className="bg-black text-white text-sm px-5 py-[6px] rounded-lg font-pretendard font-semibold hover:bg-gray-800 transition-all">
              등록
            </button>
          </div>
        </div>

        {/* 댓글 리스트 */}
        {[1, 2].map((_, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-5 mb-6 bg-white shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-full bg-gray-300" />
              <div className="flex flex-col">
                <span className="font-semibold text-sm">김태현</span>
                <span className="text-xs text-gray-400">@kimtaehyun · 0분 전</span>
              </div>
            </div>
            <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed mb-4">
              우와 어쩌고 저쩌고 여기에 댓글이 들어갈거에요 우와 어쩌고 저쩌고 여기에 댓글이 들어갈거에요
              우와 어쩌고 저쩌고 여기에 댓글이 들어갈거에요
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => toggleReplyInput(idx)}
              >
                <img src="/images/commentIcon.svg" alt="댓글 수" className="w-4 h-4" />
                <span>180</span>
              </div>
              <div className="flex items-center gap-1">
                <img src="/images/CommonComponentIcon/LikeIcon.svg" alt="좋아요 수" className="w-4 h-4" />
                <span>89</span>
              </div>
            </div>

            {/* 대댓글 입력창 (조건부 렌더링) */}
            {openReplyIndex === idx && (
              <div className="mt-3 border border-gray-300 rounded-lg p-3 bg-gray-50">
                <textarea
                  placeholder="답글을 입력하세요"
                  className="w-full text-sm text-gray-800 resize-none border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  rows={2}
                />
                <div className="flex justify-end mt-2">
                  <button className="bg-black text-white text-sm font-pretendard font-semibold px-4 py-[5px] rounded-lg hover:bg-gray-800 transition-all">
                    등록
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedDetailPage;
