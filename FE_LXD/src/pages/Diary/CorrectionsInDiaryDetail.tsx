import DiaryContent from "../../components/Diary/DiaryContent"

const CorrectionsInDiaryDetail = () => {
    const _stats = [
    { label: "180", icon: "/images/CommonComponentIcon/CommentIcon.svg", alt: "댓글" },
    { label: "89", icon: "/images/CommonComponentIcon/LikeIcon.svg", alt: "좋아요" },
    { label: "5", icon: "/images/CommonComponentIcon/CorrectIcon.svg", alt: "교정" },
  ]
  
  return (
    <div>
      <DiaryContent 
        title="제목"
        language="한국어"
        visibility="전체공개"
        content={`요즘 하루가 정말 빨리 지나간다...`}
        stats={_stats}
      />
    </div>
  )
}

export default CorrectionsInDiaryDetail
