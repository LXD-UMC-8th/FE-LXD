import { useState } from "react";
import ComponentMap from "./CommonComponent/ComponentMap";
interface ModalWithTabsProps {
  title1: string;
  title2: string;
  title3?: string;
  count2?: number; // 친구/친구에 대한 numbering
  count3?: number; // 친구/요청에 대한 numbering
}

const ModalWithTabs = ({
  title1,
  title2,
  title3,
  count2,
  count3,
}: ModalWithTabsProps) => {
  const [activeTab, setActiveTab] = useState(title1);

  const renderTab = (title: string, count?: number) => (
    <button
      key={title}
      type="button"
      className="pb-2 text-sm font-semibold relative cursor-pointer"
      onClick={() => setActiveTab(title)}
    >
      <div className="inline-flex items-center pointer-events-none">
        <span>{title.split("/")[0]}</span>
        {count !== undefined && (
          <span className="ml-1 text-xs bg-gray-100 text-gray-500 rounded px-2 py-0.5 font-medium">
            {count}
          </span>
        )}
      </div>
      <span
        className={`pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gray-700 transition-all duration-300 ${
          activeTab === title ? "w-12 opacity-100" : "w-0 opacity-0"
        }`}
      />
    </button>
  );

  return (
    <div className="w-full">
      {/* Tabs */}
      <div
        className="flex space-x-10 pt-5 px-4 border-b border-gray-300"
        role="tablist"
      >
        {renderTab(title1)}
        {renderTab(title2, count2)}
        {title3 && renderTab(title3, count3)}
      </div>

      {/* Content */}
      <div className="px-4 pt-5">
        {activeTab === title1 && (
          <>
            <ComponentMap title={title1} />
          </>
        )}
        {activeTab === title2 && (
          <>
            <ComponentMap title={title2} />
          </>
        )}
        {title3 && activeTab === title3 && (
          <>
            <ComponentMap title={title3} />
          </>
        )}
      </div>
    </div>
  );
};

export default ModalWithTabs;
