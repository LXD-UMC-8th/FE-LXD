import { useEffect, useState, useRef } from "react";
import PrevButton from "../Common/PrevButton";
import TitleHeader from "../Common/TitleHeader";
import DiaryContent from "./DiaryContent";
import { usePostCorrection } from "../../hooks/mutations/usePostCorrection";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useGetDiaryDetail } from "../../hooks/mutations/useGetDiaryDetail";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import LoadingModal from "../Common/LoadingModal";
import { useGetCorrections } from "../../hooks/mutations/useGetCorrections";
import type { ContentsDTO } from "../../utils/types/correction";
import CorrectionsInDiaryDetail from "./CorrectionsInDiaryDetail";

type PassedState = {
  stats?: { commentCount?: number; likeCount?: number; correctCount?: number };
  meta?: { diaryId?: number };
};

const ProvideCorrections = () => {
  const { language } = useLanguage();
  const t = translate[language];
  const { diaryId } = useParams<{ diaryId?: string }>();
  const parsedDiaryId = Number(diaryId);
  const hasValidId = diaryId !== undefined && !Number.isNaN(parsedDiaryId);
  const navigate = useNavigate();
  const location = useLocation();
  const passed = (location.state ?? {}) as PassedState;

  const [selectedText, setSelectedText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [description, setDescription] = useState("");
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const contentAreaRef = useRef<HTMLDivElement>(null);

  const { mutate: postCorrection } = usePostCorrection();

  // 일기 상세 조회
  const { mutate: fetchDiaryDetail, data: diaryData } = useGetDiaryDetail();

  useEffect(() => {
    if (hasValidId) {
      fetchDiaryDetail({ diaryId: parsedDiaryId });
    }
  }, [hasValidId, parsedDiaryId, fetchDiaryDetail]);

  const diary = diaryData?.result;

  /** 교정 댓글 조회 */
  const {
    mutate: fetchCorrections,
    data: correctionData,
    isPending: isCorrectionsPending,
  } = useGetCorrections();

  useEffect(() => {
    if (!hasValidId) return;
    fetchCorrections({ diaryId: parsedDiaryId, page: 1, size: 10 });
  }, [hasValidId, parsedDiaryId, fetchCorrections]);

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
        setShowModal(false);
        return;
      }

      const modalEl = document.getElementById("correction-modal");
      if (modalEl?.contains(e.target as Node)) return;

      const range = selection.getRangeAt(0);
      const text = selection.toString().trim();

      const allowed = contentAreaRef.current;
      const isInsideContent =
        !!allowed &&
        (allowed.contains(range.commonAncestorContainer) ||
          (selection.anchorNode && allowed.contains(selection.anchorNode)) ||
          (selection.focusNode && allowed.contains(selection.focusNode)));

      // 본문 밖이거나, 빈 문자열/너무 짧은 선택은 무시
      if (!isInsideContent || !text || text.length < 2) {
        setShowModal(false);
        return;
      }

      // 위치 계산 (containerRef 기준)
      const rect = range.getBoundingClientRect();
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();

      const top = rect.bottom - containerRect.top + 10;
      const left = rect.left - containerRect.left;

      setModalPosition({ top, left });
      setSelectedText(text);
      setEditedText("");
      setShowModal(true);
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleSubmit = () => {
    if (!editedText.trim() || !description.trim() || !selectedText.trim()) return;

    postCorrection(
      {
        diaryId: parsedDiaryId,
        original: selectedText,
        corrected: editedText,
        commentText: description,
      },
      {
        onSuccess: () => setShowModal(false),
      }
    );
  };

  const commentCount = passed.stats?.commentCount ?? 0;
  const likeCount = passed.stats?.likeCount ?? 0;
  const correctCount = passed.stats?.correctCount ?? 0;

  return (
    <div
      className="flex justify-center items-start mx-auto px-6 sm:px-40 pt-6 relative"
      ref={containerRef}
    >
      <div className="w-full max-w-[750px]">
        {/* 뒤로가기 */}
        <div className="mb-4 flex items-center gap-3 justify-between select-none">
          <PrevButton navigateURL={-1} />
          <TitleHeader title={t.CorrectButton} />
          <button
            className="bg-primary-500 text-primary-50 font-medium rounded-[5px] h-[43px] w-[118px] px-1 cursor-pointer hover:bg-[#CFDFFF] hover:text-[#4170fe] duration-300"
            onClick={() => navigate(-1)}
          >
            {t.CompleteCorrect}
          </button>
        </div>

        {/* 본문 */}
        <div className="bg-white p-8 rounded-[10px]">
          <DiaryContent
            title={diary?.title ?? ""}
            lang={diary?.language ?? ""}
            visibility={diary?.visibility ?? ""}
            content={diary?.content}
            writerNickname={diary?.writerNickName}
            writerUsername={diary?.writerUserName}
            stats={[
              { label: String(commentCount), icon: "/images/CommonComponentIcon/CommentIcon.svg", alt: "댓글" },
              { label: String(likeCount), icon: "/images/CommonComponentIcon/LikeIcon.svg", alt: "좋아요" },
              { label: String(correctCount), icon: "/images/CommonComponentIcon/CorrectIcon.svg", alt: "교정" },
            ]}
            diaryId={diary?.diaryId ?? 0}
            createdAt={diary?.createdAt ?? ""}
            {...(diary?.thumbnail ? { thumbnail: diary.thumbnail } : {})}
            contentRootRef={contentAreaRef}
          />
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div
          id="correction-modal"
          className="absolute z-50 w-[450px] h-[330px] bg-white border border-gray-300 shadow-xl rounded-[10px] p-5"
          style={{ top: modalPosition.top, left: modalPosition.left }}
        >
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-7 right-5 cursor-pointer"
          >
            <img src="/images/DeleteButton.svg" className="w-3 h-3" alt="닫기 버튼" />
          </button>

          <h2 className="text-subhead3 font-semibold mb-4">{t.ProvideCorrect}</h2>
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
                  placeholder={t.CorrectSentence}
                />
              </div>
            </div>

            <div className="rounded-[10px] bg-gray-200 border border-gray-300 text-gray-900">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-[10px] px-3 py-3 text-body2 h-15 resize-none focus:outline-none"
                rows={2}
                placeholder={t.CorrectExp}
              />
            </div>
          </div>

          {/* 등록하기 버튼 */}
          <div className="flex justify-end mt-5">
            <button
              onClick={handleSubmit}
              className="group absolute flex items-center gap-2 bg-primary-500 text-white text-sm font-medium px-4 py-3 rounded-[5px] transition cursor-pointer hover:bg-[#CFDFFF] hover:text-[#4170fe] duration-300"
            >
              <img src="/images/correctionpencil.svg" alt="교정 아이콘" className="w-5 h-5 group-hover:hidden" />
              <img src="/images/CorrectHover.svg" alt="교정 아이콘 hover" className="w-5 h-5 hidden group-hover:block transition-300" />
              {t.CorrectEnroll}
            </button>
          </div>
        </div>
      )}

      {/* 오른쪽 교정 영역 */}
      <div className="flex flex-col px-5 gap-3 select-none">
        <div className="flex items-center gap-2">
          <img src="/images/Correct.svg" className="w-5 h-5" />
          <p className="text-subhead3 font-semibold py-3">{t.CorrectionsInDiary}</p>
        </div>

        {isCorrectionsPending && <LoadingModal />}

        {(correctionData?.result?.corrections?.contents ?? []).map(
          (correction: ContentsDTO) => (
            <CorrectionsInDiaryDetail key={correction.correctionId} props={correction} />
          )
        )}
      </div>
    </div>
  );
};

export default ProvideCorrections;
