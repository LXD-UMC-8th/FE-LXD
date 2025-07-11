import React from "react";

interface TabButtonProps {
  label: string;
  isActive: boolean;
  count?: number;
  onClick: () => void;
}

export default function TabButton({
  label,
  isActive,
  count,
  onClick,
}: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative font-[Pretendard] text-base pb-[2px] cursor-pointer ${
        isActive
          ? "text-black font-semibold border-b-2 border-black"
          : "text-gray-400"
      }`}
    >
      {label}
      {typeof count === "number" && (
        <span className="ml-1 text-xs bg-gray-100 text-gray-500 rounded px-2 py-0.5 font-medium">
          {count}
        </span>
      )}
    </button>
  );
}
