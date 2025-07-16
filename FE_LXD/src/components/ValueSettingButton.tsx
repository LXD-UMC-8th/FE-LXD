import { useState } from "react";

interface ValueSettingButtonProps {
  title: string[];
}

const ValueSettingButton = ({ title }: ValueSettingButtonProps) => {
  const [selectedLang, setSelectedLang] = useState(title[0]);

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setSelectedLang(title[0])}
        className={`w-20 h-10 rounded-[5px] cursor-pointer transition duration-200
          ${
            selectedLang === title[0]
              ? "bg-gray-900 text-blue-50"
              : "bg-gray-300 text-gray-700"
          }
        `}
      >
        {title[0]}
      </button>
      <button
        onClick={() => setSelectedLang(title[1])}
        className={`w-20 h-10 rounded-[5px] cursor-pointer transition duration-200
          ${
            selectedLang === title[1]
              ? "bg-gray-900 text-blue-50"
              : "bg-gray-300 text-gray-700"
          }
        `}
      >
        {title[1]}
      </button>
    </div>
  );
};

export default ValueSettingButton;
