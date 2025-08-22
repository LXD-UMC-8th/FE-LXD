import { useState, useEffect } from "react";
import { getLocalStorageItem } from "../../apis/axios";

interface ValueSettingButtonProps {
  title1: string;
  title2: string;
  onClick?: (value: string) => void;
  selected?: string;
  selectedLang?: string;
}

const ValueSettingButton = ({
  title1,
  title2,
  onClick,
}: ValueSettingButtonProps) => {
  const [selected, setSelected] = useState(title1);

  const handleClick = (value: string) => {
    setSelected(value);
    if (onClick) {
      onClick(value);
    }
  };

  useEffect(() => {
    const currentLocation = window.location.href;
    console.log("Current location:", currentLocation);
    if (currentLocation.includes("writing")) {
      setSelected(getLocalStorageItem("style") ?? title1);
    }
  }, []);

  if (window.location)
    return (
      <div className="flex gap-2">
        <button
          value={title1}
          onClick={() => handleClick(title1)}
          className={`inline-block px-4 h-10 rounded-[5px] cursor-pointer transition duration-200
          ${
            selected === title1
              ? "bg-primary-500 text-primary-50"
              : "bg-gray-300 text-gray-700"
          }
        `}
        >
          {title1}
        </button>
        <button
          value={title2}
          onClick={() => handleClick(title2)}
          className={`inline-block px-4 h-10 rounded-[5px] cursor-pointer transition duration-200
          ${
            selected === title2
              ? "bg-primary-500 text-primary-50"
              : "bg-gray-300 text-gray-700"
          }
        `}
        >
          {title2}
        </button>
      </div>
    );
};

export default ValueSettingButton;
