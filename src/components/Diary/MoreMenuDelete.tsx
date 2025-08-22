import React from "react";

type Props = {
  targetId: number;
  isOwner: boolean;
  openMenuId: number | null;
  setOpenMenuId: React.Dispatch<React.SetStateAction<number | null>>;
  menuWrapperRef: React.RefObject<HTMLDivElement | null>;
  onDelete: (id: number) => void;
  confirmText: string;
  buttonLabel: string; 
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
  confirmText,
  buttonLabel,
  iconSrc = "/images/more_options.svg",
  align = "left",
}) => {
  const isMenuOpen = openMenuId === targetId;

  return (
    <div 
      className="relative" 
      ref={isMenuOpen ? menuWrapperRef : null}
    >
      <img
        src={iconSrc}
        className="w-5 h-5 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenuId(isMenuOpen ? null : targetId);
        }}
        alt="more"
      />

      {isOwner && isMenuOpen && (
        <div
          className={`absolute top-5 ${align === "left" ? "left-2" : "right-2"} z-10`}
        >
          <button
            className="min-w-[96px] h-9 bg-white border border-gray-300 rounded-[5px] text-body2 text-alert px-3 
                       cursor-pointer shadow-md hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!confirm(confirmText)) return;
              setOpenMenuId(null);
              onDelete(targetId);
            }}
          >
            {buttonLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default MoreMenuDelete;
