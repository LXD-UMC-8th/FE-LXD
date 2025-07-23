import { useState } from "react";

interface ValueSettingButtonProps {
  title1: string;
  title2: string;
  onClick?: (value: string) => string;
}

const ValueSettingButton = ({
  title1,
  title2,
  onClick,
}: ValueSettingButtonProps) => {
  const [selected, setSelected] = useState(title1);

  const handleClick = (value: string) => {
    setSelected(value); // update UI state
    if (onClick) {
      onClick(value); // notify parent
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleClick(title1)}
        className={`inline-block px-4 h-10 rounded-[5px] cursor-pointer transition duration-200
          ${
            selected === title1
              ? "bg-gray-900 text-blue-50"
              : "bg-gray-300 text-gray-700"
          }
        `}
      >
        {title1}
      </button>
      <button
        onClick={() => handleClick(title2)}
        className={`inline-block px-4 h-10 rounded-[5px] cursor-pointer transition duration-200
          ${
            selected === title2
              ? "bg-gray-900 text-blue-50"
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
