import React, { useEffect, useRef, type SyntheticEvent } from "react";

type Props = {
  open: boolean;
  position: { top: number; left: number };
  selectedText: string;
  editedText: string;
  description: string;
  onChangeEditedText: (v: string) => void;
  onChangeDescription: (v: string) => void;
  onClose: () => void;
  onSubmit: (e?: SyntheticEvent) => void;
  editedInputRef?: React.RefObject<HTMLTextAreaElement | null>;
  t: Record<string, string>;
};

const CorrectionModal: React.FC<Props> = ({
  open,
  position,
  selectedText,
  editedText,
  description,
  onChangeEditedText,
  onChangeDescription,
  onClose,
  onSubmit,
  editedInputRef,
  t,
}) => {
  const localRef = useRef<HTMLTextAreaElement>(null);
  const focusRef = editedInputRef ?? localRef;

  useEffect(() => {
    if (open) {
      // 모달이 열릴 때 교정 입력창에 포커스
      setTimeout(() => focusRef.current?.focus(), 0);
    }
  }, [open, focusRef]);

  if (!open) return null;

  return (
    <div
      id="correction-modal"
      role="dialog"
      aria-modal="true"
      className="absolute z-50 w-[450px] h-[330px] bg-white border border-gray-300 shadow-xl rounded-[10px] p-5"
      style={{ top: position.top, left: position.left }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
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
              ref={focusRef}
              value={editedText}
              onChange={(e) => onChangeEditedText(e.target.value)}
              className="w-full px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-200 text-primary-500 font-medium bg-primary-50"
              rows={1}
              placeholder={t.CorrectSentence}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit(e);
                }
              }}
            />
          </div>
        </div>

        <div className="rounded-[10px] bg-gray-200 border border-gray-300 text-gray-900">
          <textarea
            value={description}
            onChange={(e) => onChangeDescription(e.target.value)}
            className="w-full rounded-[10px] px-3 py-3 text-body2 h-15 resize-none focus:outline-none"
            rows={2}
            placeholder={t.CorrectExp}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmit(e);
              }
            }}
          />
        </div>
      </div>

      {/* 등록하기 버튼 */}
      <div className="flex justify-end mt-5">
        <button
          type="button"
          onClick={(e) => onSubmit(e)}
          className="group absolute flex items-center gap-2 bg-primary-500 text-white text-sm font-medium px-4 py-3 rounded-[5px] transition cursor-pointer hover:bg-[#CFDFFF] hover:text-[#4170fe] duration-300"
        >
          <img src="/images/correctionpencil.svg" alt="교정 아이콘" className="w-5 h-5 group-hover:hidden" />
          <img src="/images/CorrectHover.svg" alt="교정 아이콘 hover" className="w-5 h-5 hidden group-hover:block transition-300" />
          {t.CorrectEnroll}
        </button>
      </div>
    </div>
  );
};

export default CorrectionModal;
