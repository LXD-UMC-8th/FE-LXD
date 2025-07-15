import { useState } from "react";
interface ValueSettingButtonProps {
  value: string;
}
const ValueSettingButton = ({ value }: ValueSettingButtonProps) => {
  const [selectedLang, setSelectedLang] = useState(value);

  return (
    <button
      onClick={() => setSelectedLang(value)}
      className={`w-20 h-10 rounded-[5px] cursor-pointer transition duration-200
          ${
            selectedLang === value
              ? "bg-gray-900 text-blue-50"
              : "bg-gray-300 text-gray-700"
          }
        `}
    >
      {value}
    </button>
  );
};

export default ValueSettingButton;
