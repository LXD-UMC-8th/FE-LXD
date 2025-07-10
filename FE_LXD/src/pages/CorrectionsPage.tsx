import { useState } from "react"
import CorrectionComponent from "../components/CorrectionComponent";

const CorrectionsPage = () => {
  const tabs = ["내가 받은 교정", "내가 제공한 교정"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const renderTab = (title: string) => (
    <button
      key={title}
      className="pb-2 text-subhead3 font-semibold relative cursor-pointer"
      onClick={() => setActiveTab(title)}
    >
      {title}
      <span 
        className={`absolute bottom-0 left-1/2 -translate-x-1 h-[2px] bg-gray-700 transition-all duration-300 ${
          activeTab === title ? "w-12 opacity-100" : "w-0 opacity-0"
        }`}
      />
    </button>
  );

  return (
    <div className="w-full">
      {/* Tabs */}
      <div>
        {tabs.map((tab) => renderTab(tab))}
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {activeTab === "내가 받은 교정" && <CorrectionComponent />}
        {activeTab === "내가 제공한 교정" && <CorrectionComponent />}
      </div>
    </div>
  )
}

export default CorrectionsPage
