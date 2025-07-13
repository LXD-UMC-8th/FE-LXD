import { useState } from "react"

const ExploreTab = () => {
  const [selectedLang, setSelectedLang] = useState("한국어");

  return (
    <div className="flex gap-2 pt-3 pb-4">
      <button 
        onClick={() => setSelectedLang("한국어")}
        className={`w-20 h-10 rounded-[5px] cursor-pointer transition duration-200
          ${selectedLang === "한국어"
            ? "bg-gray-900 text-blue-50"
            : "bg-gray-300 text-gray-700"
          }
        `}>
        한국어
      </button>
      <button 
        onClick={() => setSelectedLang("English")}
        className={`w-20 h-10 rounded-[5px] cursor-pointer transition duration-200
          ${selectedLang === "English"
            ? "bg-gray-900 text-blue-50"
            : "bg-gray-300 text-gray-700"
          }
        `}>
        English
      </button>
    </div>
  )
}

export default ExploreTab
