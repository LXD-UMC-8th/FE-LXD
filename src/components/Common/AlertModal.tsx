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
}

const AlertModal = ({
  onClose,
  title,
  description,
  confirmText,
  onConfirm,
}: AlertModalProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useOutsideClick(ref, onClose);
  const { language } = useLanguage();
  const t = translate[language];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        ref={ref}
        className={`relative bg-white w-130 rounded-xl text-center ${
          description ? "h-70" : "h-60"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 text-l p-2 font-bold cursor-pointer"
        >
          ✕
        </button>
        <div className="pt-15 px-5">
          <p className="text-subhead2 font-bold">{title}</p>
          {description && (
            <p className="text-gray-700 text-body1 py-2 px-10">{description}</p>
          )}

          <div className={`flex gap-3 px-16 ${description ? "pt-3" : "pt-6"}`}>
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
