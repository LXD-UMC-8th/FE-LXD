import { useEffect, useState, useRef } from "react";
import PrevButton from "../Common/PrevButton";
import TitleHeader from "../Common/TitleHeader";
import DiaryContent from "./DiaryContent";
import { usePostCorrection } from "../../hooks/mutations/usePostCorrection";
import { useParams } from "react-router-dom";
import { useGetDiaryDetail } from "../../hooks/mutations/useGetDiaryDetail";

const ProvideCorrections = () => {

  const { diaryId } = useParams<{ diaryId?: string }>();
  const parsedDiaryId = Number(diaryId);
  const hasValidId = diaryId !== undefined && !Number.isNaN(parsedDiaryId);

  const [selectedText, setSelectedText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [description, setDescription] = useState("");
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const { mutate: postCorrection } = usePostCorrection();

  // 일기 상세 조회
  const {
    mutate: fetchDiaryDetail,
    data: diaryData, 
  } = useGetDiaryDetail();

  useEffect(() => {
    if (hasValidId) {
      fetchDiaryDetail({ diaryId: parsedDiaryId });
    }
  }, [hasValidId, parsedDiaryId, fetchDiaryDetail]);

  const diary = diaryData?.result;

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      const modalEl = document.getElementById("correction-modal");
      if (modalEl?.contains(e.target as Node)) return;

      if (text && selection?.rangeCount) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        const container = containerRef.current;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();

        // container 내부 기준으로 위치 계산
        const top = rect.bottom - containerRect.top + 10;
        const left = rect.left - containerRect.left;

        setModalPosition({ top, left });
        setSelectedText(text);
        setEditedText("");
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleSubmit = () => {
    if (!editedText.trim() || !description.trim() || !selectedText.trim()) return;

    postCorrection({
      diaryId: parsedDiaryId,
      original: selectedText,
      corrected: editedText,
      commentText: description,
    }, {
      onSuccess: () => {
        setShowModal(false);
      },
    });
  };

  const _stats = [
    {
      label: "180",
      icon: "/images/CommonComponentIcon/CommentIcon.svg",
      alt: "댓글",
    },
    {
      label: "89",
      icon: "/images/CommonComponentIcon/LikeIcon.svg",
      alt: "좋아요",
    },
    {
      label: "5",
      icon: "/images/CommonComponentIcon/CorrectIcon.svg",
      alt: "교정",
    },
  ];

  return (
    <div
      className="flex justify-center items-start mx-auto px-6 pt-6 relative"
      ref={containerRef}
    >
      <div className="w-full max-w-[750px]">
        {/* 뒤로가기 */}
        <div className="mb-4 flex items-center gap-3">
          <PrevButton navigateURL={-1} />
          <TitleHeader title="교정하기" />
        </div>

        {/* 본문 */}
        <div className="bg-white p-8 rounded-[10px]">
          <DiaryContent
            title={diary?.title ?? ""}
            language={diary?.language ?? ""}
            visibility={diary?.visibility ?? ""}
            content={diary?.content}
            stats={_stats}
          />
        </div>
      </div>

      {/* 모달 띄우기 */}
      {showModal && (
        <div
          id="correction-modal"
          className="absolute z-50 w-[450px] h-[330px] bg-white border border-gray-300 shadow-xl rounded-[10px] p-5"
          style={{
            top: modalPosition.top,
            left: modalPosition.left,
          }}
        >
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-7 right-5 cursor-pointer"
          >
            <img
              src="/images/DeleteButton.svg"
              className="w-3 h-3"
              alt="닫기 버튼"
            />
          </button>

          <h2 className="text-subhead3 font-semibold mb-4">교정 제공하기</h2>

          <div className="border-t border-gray-300 my-4" />

          <div className="flex flex-col gap-3">
            {/* 선택된 텍스트 & 수정 입력 영역 */}
            <div className="flex flex-col border border-gray-300 rounded-[10px] p-4 text-body2 gap-2">
              <div className="font-medium">{selectedText}</div>

              <div className="flex items-center">
                <div className="w-1 h-9 bg-primary-500" />
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-200 text-primary-500 font-medium bg-primary-50"
                  rows={1}
                  placeholder="수정된 문장을 입력하세요."
                />
              </div>
            </div>

            <div className="rounded-[10px] bg-gray-200 border border-gray-300 text-gray-900">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-[10px] px-3 py-3 text-body2 h-15 resize-none focus:outline-none"
                rows={2}
                placeholder="수정 이유를 작성해주세요."
              />
            </div>
          </div>

          {/* 등록하기 버튼 */}
          <div className="flex justify-end mt-5">
            <button
              onClick={handleSubmit}
              className="absolute flex items-center gap-2 bg-primary-500 text-white text-sm font-medium px-4 py-3 rounded-[5px] transition cursor-pointer hover:scale-105 duration-300"
            >
              <img
                src="/images/correctionpencil.svg"
                className="w-5 h-5"
                alt="교정 아이콘"
              />
              등록하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProvideCorrections;
