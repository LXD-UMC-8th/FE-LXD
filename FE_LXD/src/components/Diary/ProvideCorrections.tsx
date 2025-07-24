import { useEffect, useState, useRef } from "react";
import PrevButton from "../Common/PrevButton";
import TitleHeader from "../Common/TitleHeader";
import DiaryContent from "./DiaryContent";

const ProvideCorrections = () => {
  const [selectedText, setSelectedText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [description, setDescription] = useState("");
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const handleMouseUp = (e: MouseEvent) => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    // 모달 클릭 시 무시 (모달 영역에 클릭되면 return)
    const modalEl = document.getElementById("correction-modal");
    if (modalEl?.contains(e.target as Node)) return;

    if (text && selection?.rangeCount) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();

      if (containerRect) {
        setModalPosition({
          top: rect.bottom - containerRect.top + 8,
          left: rect.left - containerRect.left,
        });
      }

      // ✅ 새 텍스트가 선택됐을 때만 showModal true
      if (text !== selectedText) {
        setSelectedText(text);
        setEditedText(text);
        setShowModal(true);
      }
    } else {
      // 선택 텍스트 없을 때만 닫기
      setShowModal(false);
    }
  };

  document.addEventListener("mouseup", handleMouseUp);
  return () => document.removeEventListener("mouseup", handleMouseUp);
}, [selectedText]);


  const _stats = [
    { label: "180", icon: "/images/CommonComponentIcon/CommentIcon.svg", alt: "댓글" },
    { label: "89", icon: "/images/CommonComponentIcon/LikeIcon.svg", alt: "좋아요" },
    { label: "5", icon: "/images/CommonComponentIcon/CorrectIcon.svg", alt: "교정" },
  ];

  return (
    <div className="flex justify-center items-start mx-auto px-6 pt-6 relative" ref={containerRef}>
      <div className="w-full max-w-[750px]">
        {/* 뒤로가기 */}
        <div className="mb-4 flex items-center gap-3">
          <PrevButton navigateURL="/feed/:id" />
          <TitleHeader title="교정하기" />
        </div>

        {/* 본문 */}
        <div className="bg-white p-8 rounded-[10px]">
          <DiaryContent
            title="제목"
            language="한국어"
            visibility="전체공개"
            content={`요즘는 하루가 정말 빨리 지나간다.
              오늘도 눈 뜨고 정신 차려보니 벌써 저녁. 
              오전엔 간단하게 집 정리하고, 밀린 설거지 해치웠다.
              생각보다 시간이 오래 걸려서 커피 한 잔 마시고 나니 벌써 점심시간.
              점심은 냉장고에 남아있던 재료들로 대충 볶음밥. 어제보다 낫다. 
              오후엔 컴퓨터 앞에 앉아서 이것저것 정리했다.`}
            stats={_stats}
          />
        </div>
      </div>

      {/* 모달 띄우기 */}
      {showModal && (
        <div
          id="correction-modal"
          className="absolute z-50 w-[500px] bg-white border border-gray-400 shadow-xl rounded-[10px] p-5"
          style={{
            top: modalPosition.top,
            left: modalPosition.left,
          }}
        >
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-3 right-3 text-gray-600 text-xl cursor-pointer"
          >
            ×
          </button>

          <h2 className="text-subhead3 font-semibold mb-4">교정 제공하기</h2>

          <div className="border-t border-gray-400 my-4"/>

          {/* 선택된 텍스트 & 수정 입력 영역 */}
          <div className="border border-gray-400 rounded-[10px] p-4 text-body2">
            <div className="">
              {selectedText}
            </div>
            <textarea     
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full rounded py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 text-[#4170FE]"
              rows={2}
              placeholder="수정된 문장을 입력하세요."
            />
          </div>

          <div className="rounded-[10px] bg-gray-200 border border-gray-400 text-gray-900">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="수정 이유를 작성해주세요."
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={() => {
                console.log({ selectedText, editedText, description });
                setShowModal(false);
              }}
              className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              등록하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProvideCorrections;
