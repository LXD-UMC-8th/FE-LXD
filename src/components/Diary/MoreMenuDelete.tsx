import React, { useState } from "react";
import AlertModal from "../Common/AlertModal";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

type Props = {
  targetId: number;
  isOwner: boolean;
  openMenuId: number | null;
  setOpenMenuId: React.Dispatch<React.SetStateAction<number | null>>;
  menuWrapperRef: React.RefObject<HTMLDivElement | null>;
  onDelete?: (id: number) => void;
  onReport?: (id: number) => void;
  confirmText: string;
  buttonLabel?: string;
  iconSrc?: string;
  align?: "left" | "right";
};

const MoreMenuDelete: React.FC<Props> = ({
  targetId,
  isOwner,
  openMenuId,
  setOpenMenuId,
  menuWrapperRef,
  onDelete,
  onReport,
  confirmText,
  buttonLabel,
  iconSrc = "/images/more_options.svg",
  align = "left",
}) => {
  const { language } = useLanguage();
  const t = translate[language];

  const isMenuOpen = openMenuId === targetId;

  // 일기 신고 로직
  const [alertContent, setAlertContent] = useState(false);
  const [reportReason, setReportReason] = useState("");

  // 댓글 삭제하기 시
  const _handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm(confirmText)) return;
    setOpenMenuId(null);
    onDelete?.(targetId);
  };

  // 댓글 신고하기 시
  const _handleReport = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAlertContent(true);
    setReportReason("");
  };

  const _confirmReport = () => {
    onReport?.(targetId);
    alert(t.CompleteAlert);
    setAlertContent(false);
    setOpenMenuId(null);
    setReportReason("");
  };

  return (
    <div className="relative" ref={isMenuOpen ? menuWrapperRef : null}>
      <img
        src={iconSrc}
        className="w-5 h-5 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenuId(isMenuOpen ? null : targetId);
        }}
        alt="more"
      />

      {isMenuOpen && (
        <div
          className={`absolute top-5 ${
            align === "left" ? "left-2" : "right-2"
          } z-10 flex flex-col gap-2`}
        >
          {/* 삭제 버튼 */}
          {isOwner && (
            <button
              className="min-w-[96px] h-9 bg-white border border-gray-300 rounded-[5px] text-body2 text-alert px-3 
                       cursor-pointer shadow-md hover:bg-gray-100"
              onClick={_handleDelete}
            >
              {buttonLabel}
            </button>
          )}

          {/* 신고 버튼 */}
          {!isOwner && (
            <button
              className="min-w-[96px] h-9 bg-white border border-gray-300 rounded-[5px] text-body2 text-red-500 px-3 
                      cursor-pointer shadow-md hover:bg-gray-100"
              onClick={_handleReport}
            >
              {t.AlertReport}
            </button>
          )}
        </div>
      )}

      {/* 신고 모달 */}
      {alertContent && (
        <AlertModal
          title={t.ReportContent}
          onClose={() => setAlertContent(false)}
          description={t.AlertDescription}
          confirmText={t.AlertReport}
          alertMessage={t.CompleteAlert}
          onInputChange={setReportReason}
          inputValue={reportReason}
          onConfirm={_confirmReport}
        />
      )}
    </div>
  );
};

export default MoreMenuDelete;
