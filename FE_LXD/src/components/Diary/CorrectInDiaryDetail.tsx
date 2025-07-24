import PrevButton from "../Common/PrevButton";
import TitleHeader from "../Common/TitleHeader";
import DiaryContent from "./DiaryContent";

const CorrectInDiaryDetail = () => {
  const _stats = [
    { label: "180", icon: "/images/CommonComponentIcon/CommentIcon.svg", alt: "댓글" },
    { label: "89", icon: "/images/CommonComponentIcon/LikeIcon.svg", alt: "좋아요" },
    { label: "5", icon: "/images/CommonComponentIcon/CorrectIcon.svg", alt: "교정" },
  ];

  return (
    <div className="flex justify-center items-start mx-auto px-6 pt-6">
      <div className="w-full max-w-[750px]">
        {/* 뒤로가기 */}
        <div className="mb-4 flex">
          <PrevButton navigateURL="/feed/:id" />
          <TitleHeader title="교정하기" />
        </div>
    
        {/* 공통 컨텐츠 영역 */}
        <div className="bg-white p-8 rounded-[10px]">
          <DiaryContent
            title="제목"
            language="한국어"
            visibility="전체공개"
            content={`본문 내용입니다.`}
            stats={_stats}
          />
        </div>
      </div>
    </div>
  )
}

export default CorrectInDiaryDetail
