import { useState } from "react";

interface ModalWithTabsProps {
  title1: string;
  title2: string;
}

const ModalWithTabs = ({ title1, title2 }: ModalWithTabsProps) => {
  const [activeTab, setActiveTab] = useState(title1);

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex space-x-10 gap-10 pt-5 px-4.5 border-b border-gray-300">
        <button
          className="pb-2 text-sm font-semibold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black cursor-pointer "
          onClick={() => setActiveTab(title1)}
        >
          {title1}
          <span
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gray-700 transition-all duration-300 ${
              activeTab === title1 ? "w-15 opacity-100" : "w-0 opacity-0"
            }`}
          />
        </button>
        <button
          className="pb-2 text-sm font-semibold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black cursor-pointer"
          onClick={() => setActiveTab(title2)}
        >
          {title2}
          <span
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gray-700 transition-all duration-300 ${
              activeTab === title2 ? "w-15 opacity-100" : "w-0 opacity-0"
            }`}
          />
        </button>
      </div>

      {/* Optional content under tabs */}
      <div className="px-4 py-6">
        {activeTab === title1 && <div>{title1} 콘텐츠 표시</div>}
        {activeTab === title2 && <div>{title2} 콘텐츠 표시</div>}
      </div>
    </div>
  );
};

export default ModalWithTabs;
