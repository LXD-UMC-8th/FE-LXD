import { useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { translate } from "../../context/translate";
import { useLanguage } from "../../context/LanguageProvider";

interface AlertModalProps {
  onClose: (e?: any) => void;
  title: string;
  description?: string;
  confirmText: string;
  alertMessage: string;
  onConfirm?: (e?: any) => void;
  inputValue?: string;
  onInputChange?: (value: string) => void;
}

const AlertModal = ({
  onClose,
  title,
  description,
  confirmText,
  onConfirm,
  inputValue,
  onInputChange,
}: AlertModalProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useOutsideClick(ref, onClose);
  const { language } = useLanguage();
  const t = translate[language];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        ref={ref}
        className="relative bg-white w-130 rounded-xl text-center h-auto min-h-[240px] max-h-[800px] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 text-l p-2 font-bold cursor-pointer"
        >
          ✕
        </button>
        <div className="flex flex-col items-center pt-12 pb-8 px-6">
          <p className="text-subhead2 font-bold text-black">{title}</p>
          {description && (
            <p className="text-gray-700 text-body1 py-2 px-10 pt-5">
              {description}
            </p>
          )}

          {/* 콘텐츠 신고 모달 시 텍스트 input */}
          {onInputChange && (
            <>
              <div className="flex flex-col self-start items-start text-body2 text-primary-900 pt-1 pb-2 pl-15">
                <ul className="flex gap-1 cursor-pointer">
                  <img src="/images/CheckIcon.svg" alt="Check mark" />
                  {t.ReportContent_1}
                </ul>
                <ul className="flex gap-1 cursor-pointer">
                  <img src="/images/CheckIcon.svg" alt="Check mark" />
                  {t.ReportContent_2}
                </ul>
                <ul className="flex gap-1 cursor-pointer">
                  <img src="/images/CheckIcon.svg" alt="Check mark" />
                  {t.ReportContent_3}
                </ul>
              </div>
              <div className="flex bg-gray-200 w-[400px] h-[50px] rounded-[10px]">
                <textarea
                  value={inputValue}
                  className="w-full h-full text-body1 flex p-3 resize-none focus:outline-none"
                  onChange={(e) => onInputChange(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </div>
            </>
          )}

          <div className={`flex gap-3 px-16 ${description ? "pt-7" : "pt-6"}`}>
            <button
              onClick={onConfirm}
              className="w-50 h-12 bg-primary rounded-[5px] text-white text-body1 font-medium cursor-pointer hover:scale-105 duration-300"
            >
              {confirmText}
            </button>

            <button
              className="w-31 h-12 bg-onPrimary rounded-[5px] text-[#5076F3] text-body1 font-medium cursor-pointer hover:scale-105 duration-300"
              onClick={onClose}
            >
              {t.Close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
