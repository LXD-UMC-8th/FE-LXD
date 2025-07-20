import { useState } from "react";
import CorrectionComponent from "../components/CorrectionComponent";

const CorrectionsPage = () => {
  const tabs = ["내가 받은 교정", "내가 제공한 교정"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const renderTab = (title: string) => (
    <button
      key={title}
      className={`inline-flex flex-col items-center pb-2 text-subhead3 font-semibold relative cursor-pointer
        ${activeTab === title ? "text-black" : "text-gray-500"}`}
      onClick={() => setActiveTab(title)}
    >
      {title}
      <span
        className={`mt-[2px] h-[2px] bg-black transition-all duration-300 ${
          activeTab === title ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      />
    </button>
  );

  return (
    <div className="w-[600px] min-h-screen bg-gray-100">
      {/* Tabs */}
      <div className="flex gap-7">{tabs.map((tab) => renderTab(tab))}</div>

      {/* Content */}
      <div className="px-4 py-6 ">
        {activeTab === "내가 받은 교정" && <CorrectionComponent />}
        {activeTab === "내가 제공한 교정" && <CorrectionComponent />}
      </div>
    </div>
  );
};

export default CorrectionsPage;
