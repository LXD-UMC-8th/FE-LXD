import { useState } from "react";

interface ExploreTabProps {
  title1: string;
  title2: string;
}

const ExploreTab = ({ title1, title2 }: ExploreTabProps) => {
  const [selectedLang, setSelectedLang] = useState(title1);

  return (
    <div className="flex gap-2 pt-3 pb-4">
      <button
        onClick={() => setSelectedLang(title1)}
        className={`w-20 h-10 rounded-[5px] cursor-pointer transition duration-200
          ${
            selectedLang === title1
              ? "bg-gray-900 text-blue-50"
              : "bg-gray-300 text-gray-700"
          }
        `}
      >
        {title1}
      </button>
      <button
        onClick={() => setSelectedLang(title2)}
        className={`w-20 h-10 rounded-[5px] cursor-pointer transition duration-200
          ${
            selectedLang === title2
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

export default ExploreTab;
