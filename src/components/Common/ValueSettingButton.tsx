import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getLocalStorageItem } from "../../apis/axios";

interface ValueSettingButtonProps {
  title1: string;
  title2: string;
  onClick?: (value: string) => void;
}

const ValueSettingButton = ({ title1, title2, onClick }: ValueSettingButtonProps) => {
  const location = useLocation();
  const [selected, setSelected] = useState(title1);

  // 현재 페이지 컨텍스트 판단
  const scheme = useMemo<"writing" | "feedSearch" | "default">(() => {
    const tab = new URLSearchParams(location.search).get("tab");
    if (location.pathname.startsWith("/mydiary/writing")) return "writing";
    if (location.pathname.startsWith("/feed") && tab === "searchINfeed") return "feedSearch";
    return "default";
  }, [location.pathname, location.search]);

  // 컨텍스트별 색상 테마
  const theme = useMemo(
    () =>
      ({
        writing: {
          active: "bg-gray-900 text-primary-50",
          inactive: "bg-gray-200 text-gray-700",
        },
        feedSearch: {
          active: "bg-primary-500 text-primary-50",
          inactive: "bg-stone-200 text-gray-700",
        },
        default: {
          active: "bg-primary-500 text-primary-50",
          inactive: "bg-gray-300 text-gray-700",
        },
      } as const),
    []
  )[scheme];

  const handleClick = (value: string) => {
    setSelected(value);
    onClick?.(value);
  };

  useEffect(() => {
    if (scheme === "writing") {
      setSelected(getLocalStorageItem("style") ?? title1);
    }
  }, [scheme, title1]);

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => handleClick(title1)}
        className={`inline-block px-4 h-10 rounded-[5px] cursor-pointer transition duration-200 ${
          selected === title1 ? theme.active : theme.inactive
        }`}
      >
        {title1}
      </button>
      <button
        type="button"
        onClick={() => handleClick(title2)}
        className={`inline-block px-4 h-10 rounded-[5px] cursor-pointer transition duration-200 ${
          selected === title2 ? theme.active : theme.inactive
        }`}
      >
        {title2}
      </button>
    </div>
  );
};

export default ValueSettingButton;
