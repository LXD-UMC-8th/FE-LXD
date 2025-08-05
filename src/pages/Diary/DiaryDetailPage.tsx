import { useEffect, useState } from "react";
import PrevButton from "../../components/Common/PrevButton";
import CorrectionsInFeedDetail from "../../components/Diary/CorrectionsInDiaryDetail";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ 추가
import DiaryContent from "../../components/Diary/DiaryContent";
import LoadingModal from "../../components/Common/LoadingModal";
import type { CorrectionsDetailDTO } from "../../utils/types/correction";
import { useGetCorrections } from "../../hooks/mutations/useGetCorrections";

const DiaryDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ 추가
  const diaryId = 1;

  const backURL = location.state?.from === "profile" ? -1 : "/feed"; // ✅ 추가

  const [openReplyIndex, setOpenReplyIndex] = useState<number | null>(null);

  const _toggleReplyInput = (idx: number) => {
    setOpenReplyIndex((prev) => (prev === idx ? null : idx));
  };

  const _handleCorrectionsClick = () => {
    navigate(`/feed/${diaryId}/corrections`);
  };

  const _stats = [
    { label: "180", icon: "/images/CommonComponentIcon/CommentIcon.svg", alt: "댓글" },
    { label: "89", icon: "/images/CommonComponentIcon/LikeIcon.svg", alt: "좋아요" },
    { label: "5", icon: "/images/CommonComponentIcon/CorrectIcon.svg", alt: "교정" },
  ];

  const {
    mutate: fetchCorrections,
    data: correctionData,
    isPending,
  } = useGetCorrections();

  useEffect(() => {
    fetchCorrections({ diaryId: 1, page: 0, size: 10 });
  }, [fetchCorrections]);

  return (
    <div className="flex justify-center items-start mx-auto px-6 pt-6">
      <div className="w-full max-w-[750px]">
        {/* ← 뒤로가기 + 교정하기 */}
        <div className="mb-4 flex items-center justify-between">
          <PrevButton navigateURL={backURL} /> {/* ✅ 수정된 부분 */}
          <button
            onClick={_handleCorrectionsClick}
            className="flex items-center justify-center bg-[#4170FE] text-[#F1F5FD] font-pretendard font-bold text-sm h-[43px] w-[118.7px] rounded-[5px] px-[12px] pr-[20px] gap-[10px] hover:scale-105 duration-300 cursor-pointer"
          >
            <img
              src="/images/correctionpencil.svg"
              alt="교정 아이콘"
              className="w-[20.7px] h-[21.06px]"
            />
            교정하기
          </button>
        </div>

        <div className="bg-white p-8 rounded-[10px]">
          <DiaryContent
            title="제목"
            language="한국어"
            visibility="전체공개"
            content={`본문 내용`}
            stats={_stats}
          />

          {/* 댓글 전체 래퍼 카드 */}
          <div className="mt-10 bg-white rounded-[10px] p-6">
            <div className="flex items-center gap-2 text-black font-semibold text-[17px] mb-5">
              <img
                src="/images/commentIcon.svg"
                alt="댓글 아이콘"
                className="w-[24px] h-[24px]"
              />
              <span>댓글 (5)</span>
            </div>

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

            {[1, 2].map((_, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-5 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-gray-300" />
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-body2">김태현</span>
                    <div className="w-px h-5 bg-gray-500" />
                    <span className="text-xs text-gray-600">@kimtaehyun</span>
                    <p className="text-caption text-gray-500">0분전</p>
                  </div>
                </div>
                <p className="text-body2 text-black whitespace-pre-line leading-relaxed mb-4">
                  댓글 내용
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                  <div
                    className={`flex items-center gap-1 cursor-pointer p-1 ${
                      openReplyIndex === idx ? "bg-gray-200 rounded-[5px] text-black" : ""
                    }`}
                    onClick={() => _toggleReplyInput(idx)}
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

      <div className="flex flex-col px-5 gap-3">
        <p className="text-subhead3 font-semibold py-3">작성된 교정</p>

        {isPending && <LoadingModal />}

        {correctionData?.result.corrections.map((correction: CorrectionsDetailDTO) => (
          <CorrectionsInFeedDetail
            key={correction.correctionId}
            correction={correction}
          />
        ))}
      </div>
    </div>
  );
};

export default DiaryDetailPage;
