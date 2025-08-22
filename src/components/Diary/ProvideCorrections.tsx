import { useEffect, useState, useRef, type SyntheticEvent } from "react";
import { flushSync } from "react-dom";
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

type OptimisticContents = ContentsDTO & { _optimistic?: boolean };

const ProvideCorrections = () => {
  const { language } = useLanguage();
  const t = translate[language];
  const { diaryId } = useParams<{ diaryId?: string }>();
  const parsedDiaryId = Number(diaryId);
  const hasValidId = diaryId !== undefined && !Number.isNaN(parsedDiaryId);
  const navigate = useNavigate();
  const location = useLocation();
  const passed = (location.state ?? {}) as PassedState;
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

      setTimeout(() => editedInputRef.current?.focus(), 0);
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
    } catch {/*empty*/}
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
      setDisplayCorrections((prev) => [...prev, optimisticItem]);
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
            <DiaryContent
              title={diary?.title ?? ""}
              lang={diary?.language ?? ""}
              visibility={diary?.visibility ?? ""}
              profileImg={diary?.profileImg ?? "/images/profileImage.svg"}
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
            />
          </div>
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div
          id="correction-modal"
          role="dialog"
          aria-modal="true"
          className="absolute z-50 w-[450px] h-[330px] bg-white border border-gray-300 shadow-xl rounded-[10px] p-5"
          style={{ top: modalPosition.top, left: modalPosition.left }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(false);
            }}
            className="absolute top-7 right-5 cursor-pointer"
          >
            <img src="/images/DeleteButton.svg" className="w-3 h-3" alt="닫기 버튼" />
          </button>

          <h2 className="text-subhead3 font-semibold mb-4">{t.ProvideCorrect}</h2>
          <div className="border-t border-gray-300 my-4" />

          <div className="flex flex-col gap-3">
            {/* 선택된 텍스트 & 수정 입력 영역 */}
            <div className="flex flex-col border border-gray-300 rounded-[10px] p-4 text-body2 gap-2">
              <div className="font-medium break-words">{selectedText}</div>

              <div className="flex items-center">
                <div className="w-1 h-9 bg-primary-500" />
                <textarea
                  ref={editedInputRef}
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-200 text-primary-500 font-medium bg-primary-50"
                  rows={1}
                  placeholder={t.CorrectSentence}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
            </div>
          </div>

          {/* 등록하기 버튼 */}
          <div className="flex justify-end mt-5">
            <button
              type="button"
              onClick={(e) => handleSubmit(e)}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="group absolute flex items-center gap-2 bg-primary-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-3 rounded-[5px] transition cursor-pointer hover:bg-[#CFDFFF] hover:text-[#4170fe] duration-300"
            >
              <img src="/images/correctionpencil.svg" alt="교정 아이콘" className="w-5 h-5 group-hover:hidden" />
              <img src="/images/CorrectHover.svg" alt="교정 아이콘 hover" className="w-5 h-5 hidden group-hover:block transition-300" />
              {isSubmitting ? (t.Loading ?? "등록 중...") : t.CorrectEnroll}
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
