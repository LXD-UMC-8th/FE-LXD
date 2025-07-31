// import ProfileComponent from "../Common/ProfileComponent";

interface DiaryContentProps {
    title: string;
    language: string;
    visibility: string;
    content: string;
    stats: {label: string; icon: string; alt: string}[];
}

const DiaryContent = ({ title, language, visibility, content, stats }: DiaryContentProps) => {
  return (
    <div className="">
      {/* 제목 & 상태 */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
          {visibility}
        </span>
        <h1 className="text-subhead2 font-semibold">{title}</h1>
        <span className="text-blue-600 text-body2 font-medium ml-auto">{language}</span>
      </div>

      {/* 작성자 + 우측 정보 */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        {/* <ProfileComponent /> 작성자 프로필 */}
        <div className="flex items-center gap-3 text-caption text-gray-700 pt-5">
          {stats.map((item, index) => (
            <div key={index} className="flex gap-1">
              <img src={item.icon} alt={`${item.alt} 아이콘`} className="w-4 h-4" />
              <span>{item.label}</span>
            </div>
          ))}
          <img src="/images/more_options.svg" className="w-5 h-5 cursor-pointer" />
        </div>
      </div>

      <div className="border-t border-gray-200 my-5" />

      {/* 본문 */}
      <div className="text-center mx-20">
        <div className="w-full h-52 bg-gray-200 rounded-[10px] mb-4" />
        <p className="text-body2 leading-relaxed text-gray-800 whitespace-pre-line">
          {content}
        </p>
      </div>

      <div className="border-t border-gray-200 my-5" />

      <div className="flex items-center gap-3 text-caption text-gray-700">
        {stats.map((item, index) => (
          <div key={index} className="flex gap-1">
            <img src={item.icon} alt={`${item.alt} 아이콘`} className="w-4 h-4" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DiaryContent;
