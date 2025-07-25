import { useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

interface AlertModalProps {
    onClose: () => void;
    title: string;
    description?: string;
    confirmText: string;
    onConfirm: () => void;
    alertMessage: string;
}

const AlertModal = ({
    onClose,
    title,
    description,
    confirmText,
    onConfirm,
    alertMessage,
}: AlertModalProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useOutsideClick(ref, onClose);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div 
        ref={ref}
        className="bg-white w-120 h-65 rounded-xl text-center"
      >
        <div className="p-10">
            <p className="text-subhead1 font-bold">{title}</p>
            <p className="text-gray-700 text-body1 py-5">{description}</p>

            <div className="flex gap-3 px-16 py-5">
              <button
                onClick={() => {
                  if (alertMessage) alert(alertMessage);
                  onConfirm();
                }}
                className="w-50 h-12 bg-primary rounded-[5px] text-white text-body1 font-medium cursor-pointer hover:scale-105 duration-300"
              >
                  {confirmText}
              </button>

              <button 
                className="w-31 h-12 bg-onPrimary rounded-[5px] text-[#5076F3] text-body1 font-medium cursor-pointer hover:scale-105 duration-300"
                onClick = {onClose}
              >
                닫기
              </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AlertModal
