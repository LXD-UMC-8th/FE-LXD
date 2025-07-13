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
      className={`relative font-[Pretendard] text-sm font-semibold pb-2 cursor-pointer text-gray-700`}
    >
      <span className={isActive ? "text-gray-900" : "text-gray-400"}>
        {label}
      </span>

      {typeof count === "number" && (
        <span className="ml-1 text-xs bg-gray-100 text-gray-500 rounded px-2 py-0.5 font-medium">
          {count}
        </span>
      )}

      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gray-700 transition-all duration-300 ${
          isActive ? "w-12 opacity-100" : "w-0 opacity-0"
        }`}
      ></span>
    </button>
  );
}
