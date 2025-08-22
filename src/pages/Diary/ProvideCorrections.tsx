import { useEffect, useState, useRef, type SyntheticEvent } from "react";
import { flushSync } from "react-dom";

import { usePostCorrection } from "../../hooks/mutations/usePostCorrection";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDiaryDetail } from "../../hooks/mutations/useGetDiaryDetail";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

import { useGetCorrections } from "../../hooks/mutations/useGetCorrections";
import type { ContentsDTO } from "../../utils/types/correction";
import PrevButton from "../../components/Common/PrevButton";
import TitleHeader from "../../components/Common/TitleHeader";
import DiaryContent from "../../components/Diary/DiaryContent";
import CorrectionModal from "../../components/Diary/CorrectionModal";
import LoadingModal from "../../components/Common/LoadingModal";
import CorrectionsInDiaryDetail from "../../components/Diary/CorrectionsInDiaryDetail";



type OptimisticContents = ContentsDTO & { _optimistic?: boolean };

const ProvideCorrections = () => {
  const { language } = useLanguage();
  const t = translate[language];
  const { diaryId } = useParams<{ diaryId?: string }>();
  const parsedDiaryId = Number(diaryId);
  const hasValidId = diaryId !== undefined && !Number.isNaN(parsedDiaryId);
  const navigate = useNavigate();

  const editedInputRef = useRef<HTMLTextAreaElement>(null);

  const [selectedText, setSelectedText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [description, setDescription] = useState("");
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const contentAreaRef = useRef<HTMLDivElement>(null);

  const { mutate: postCorrection } = usePostCorrection();

  // 일기 상세 조회
  const {
    mutate: fetchDiaryDetail,
    data: diaryData,
    isPending: isDiaryPending,
  } = useGetDiaryDetail();

  useEffect(() => {
    if (hasValidId) fetchDiaryDetail({ diaryId: parsedDiaryId });
  }, [hasValidId, parsedDiaryId, fetchDiaryDetail]);

  const diary = diaryData?.result;

  // 교정 댓글 조회
  const {
    mutate: fetchCorrections,
    data: correctionData,
    isPending: isCorrectionsPending,
  } = useGetCorrections();

  const didPrimeCorrectionsRef = useRef(false);
  useEffect(() => {
    if (!hasValidId) return;
    fetchCorrections(
      { diaryId: parsedDiaryId, page: 1, size: 10 },
      {
        onSuccess: () => {
          didPrimeCorrectionsRef.current = true;
        },
      }
    );
  }, [hasValidId, parsedDiaryId, fetchCorrections]);

  const [displayCorrections, setDisplayCorrections] = useState<OptimisticContents[]>([]);

  useEffect(() => {
    const serverList: ContentsDTO[] = correctionData?.result?.corrections?.contents ?? [];
    if (!serverList.length) return;

    const fp = (x: Pick<ContentsDTO, "original" | "corrected" | "commentText">) =>
      `${(x.original ?? "").trim()}|${(x.corrected ?? "").trim()}|${(x.commentText ?? "").trim()}`;

    const serverFingerprints = new Set(serverList.map((s) => fp(s)));

    setDisplayCorrections((prev) => {
      const withoutDupOptimistic = prev.filter(
        (p) => !(p._optimistic && serverFingerprints.has(fp(p)))
      );

      const existingIds = new Set(withoutDupOptimistic.map((c) => Number(c.correctionId)));

      const merged: OptimisticContents[] = [...withoutDupOptimistic];
      for (const s of serverList) {
        const sid = Number(s.correctionId);
        if (!existingIds.has(sid)) merged.push(s as OptimisticContents);
      }
      return merged;
    });
  }, [correctionData]);

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent | TouchEvent) => {
      const modalEl = document.getElementById("correction-modal");
      if (modalEl?.contains(e.target as Node)) return;

      const selection = window.getSelection?.();
      if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
        setShowModal(false);
        return;
      }

      const range = selection.getRangeAt(0);
      const text = selection.toString().trim();

      const allowed = contentAreaRef.current;
      const isInsideContent =
        !!allowed &&
        allowed.contains(range.startContainer) &&
        allowed.contains(range.endContainer);

      if (!isInsideContent || !text || text.length < 2) {
        setShowModal(false);
        return;
      }

      const rect =
        range.getBoundingClientRect().width || range.getBoundingClientRect().height
          ? range.getBoundingClientRect()
          : range.getClientRects()[0];

      if (!rect) return;
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();

      const top = rect.bottom - containerRect.top + 10;
      let left = rect.left - containerRect.left;

      const modalWidth = 450;
      left = Math.max(8, Math.min(left, containerRect.width - modalWidth - 8));

      setModalPosition({ top, left });
      setSelectedText(text);
      setEditedText("");
      setShowModal(true);
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearSelection = () => {
    const sel = window.getSelection?.();
    try {
      sel?.removeAllRanges();
    } catch {
      /* noop */
    }
  };

  const handleSubmit = (e?: SyntheticEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (isSubmitting) return;

    if (!editedText.trim()) {
      alert(t.PleaseEnterCorrectedSentence);
      editedInputRef.current?.focus();
      return;
    }
    if (!description.trim()) {
      alert(t.PleaseEnterReason);
      return;
    }

    setIsSubmitting(true);

    const tempId = -1 * (Date.now() + Math.floor(Math.random() * 1000));
    const optimisticItem: OptimisticContents = {
      correctionId: tempId,
      original: selectedText,
      corrected: editedText,
      commentText: description,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      liked: false,
      _optimistic: true,
    } as unknown as OptimisticContents;

    flushSync(() => {
      setDisplayCorrections((prev) => [...prev, optimisticItem]); // 아래로 추가
    });

    setShowModal(false);
    setEditedText("");
    setDescription("");
    setSelectedText("");
    clearSelection();

    postCorrection(
      {
        diaryId: parsedDiaryId,
        original: optimisticItem.original,
        corrected: optimisticItem.corrected,
        commentText: optimisticItem.commentText,
      },
      {
        onSuccess: (res: any) => {
          const serverItem: ContentsDTO | undefined =
            res?.result ?? res?.data?.result ?? undefined;

          if (serverItem) {
            setDisplayCorrections((prev) =>
              prev.map((c) =>
                Number(c.correctionId) === tempId
                  ? ({ ...serverItem, _optimistic: false } as OptimisticContents)
                  : c
              )
            );
          } else {
            fetchCorrections({ diaryId: parsedDiaryId, page: 1, size: 10 });
          }
        },
        onError: () => {
          setDisplayCorrections((prev) =>
            prev.filter((c) => Number(c.correctionId) !== tempId)
          );
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

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
            type="button"
            className="bg-primary-500 text-primary-50 font-medium rounded-[5px] h-[43px] w-[118px] px-1 cursor-pointer hover:bg-[#CFDFFF] hover:text-[#4170fe] duration-300"
            onClick={() => navigate(-1)}
          >
            {t.CompleteCorrect}
          </button>
        </div>

        {/* 본문 */}
        <div className="bg-white p-8 rounded-[10px]">
          <div ref={contentAreaRef}>
            {diary && <DiaryContent props={diary} />}
          </div>
        </div>
      </div>

      {/* 모달 (컴포넌트화) */}
      <CorrectionModal
        open={showModal}
        position={modalPosition}
        selectedText={selectedText}
        editedText={editedText}
        description={description}
        onChangeEditedText={setEditedText}
        onChangeDescription={setDescription}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        editedInputRef={editedInputRef}
        t={t}
      />

      {/* 오른쪽 교정 영역 */}
      <div className="flex flex-col px-5 gap-3 select-none">
        <div className="flex items-center gap-2">
          <img src="/images/Correct.svg" className="w-5 h-5" />
          <p className="text-subhead3 font-semibold py-3">{t.CorrectionsInDiary}</p>
        </div>

        {(isDiaryPending ||
          (isCorrectionsPending && !didPrimeCorrectionsRef.current && displayCorrections.length === 0)) && (
          <LoadingModal />
        )}

        {(displayCorrections ?? []).map((correction: OptimisticContents) => (
          <CorrectionsInDiaryDetail key={Number(correction.correctionId)} props={correction} />
        ))}
      </div>
    </div>
  );
};

export default ProvideCorrections;
