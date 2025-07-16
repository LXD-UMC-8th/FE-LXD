import { useState } from "react";
import ComponentMap from "./CommonComponent/ComponentMap";

type Tabvalue = {
  value: string;
  title: string;
  count?: number | undefined;
};
interface ModalWithTabsProps {
  tabvalue: Tabvalue[];
}

const ModalWithTabs = ({ tabvalue }: ModalWithTabsProps) => {
  const [activeTab, setActiveTab] = useState(tabvalue[0].title);

  const renderTab = (value: string, title: string, count?: number) => (
    <button
      key={value}
      type="button"
      className="pb-2 text-sm font-semibold relative cursor-pointer"
      onClick={() => setActiveTab(title)}
    >
      <div className="inline-flex items-center pointer-events-none">
        <span>{title}</span>
        {count !== undefined && (
          <span className="ml-1 text-xs bg-gray-100 text-gray-500 rounded py-0.5 font-medium">
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
        {tabvalue.map((tab) => renderTab(tab.value, tab.title, tab.count))}
      </div>

      {/* Content */}
      <div className="pt-5">
        {tabvalue.map(
          (tabvalue) =>
            activeTab === tabvalue.title && (
              <ComponentMap key={tabvalue.value} tabvalue={tabvalue} />
            ),
        )}
      </div>
    </div>
  );
};

export default ModalWithTabs;
