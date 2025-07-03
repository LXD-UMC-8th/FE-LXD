import { useState } from "react";

interface ModalWithTabsProps {
  title1: string;
  title2: string;
  title3?: string;
}

const ModalWithTabs = ({ title1, title2, title3 }: ModalWithTabsProps) => {
  const [activeTab, setActiveTab] = useState(title1);

  const renderTab = (title: string) => (
    <button
      key={title}
      className="pb-2 text-sm font-semibold relative cursor-pointer"
      onClick={() => setActiveTab(title)}
    >
      {title}
      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gray-700 transition-all duration-300 ${
          activeTab === title ? "w-12 opacity-100" : "w-0 opacity-0"
        }`}
      />
    </button>
  );

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex space-x-10 pt-5 px-4 border-b border-gray-300">
        {renderTab(title1)}
        {renderTab(title2)}
        {title3 && renderTab(title3)}
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {activeTab === title1 && <div>{title1} 콘텐츠 표시</div>}
        {activeTab === title2 && <div>{title2} 콘텐츠 표시</div>}
        {title3 && activeTab === title3 && <div>{title3} 콘텐츠 표시</div>}
      </div>
    </div>
  );
};

export default ModalWithTabs;
