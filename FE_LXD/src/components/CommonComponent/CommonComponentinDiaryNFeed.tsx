import ProfileComponent from "../ProfileComponent";

interface CommonComponentInDiaryNFeedProps {
  imgUrl?: string;
  userId?: string;
  userNickname?: string;
  specificData?: string;

  postNumber?: string;
  date?: string;
}
const CommonComponentInDiaryNFeed = (
  _props: CommonComponentInDiaryNFeedProps,
) => {
  const stats = [
    { label: "댓글수", icon: "/images/CommonComponentIcon/CommentIcon.svg" },
    { label: "좋아요 수", icon: "/images/CommonComponentIcon/LikeIcon.svg" },
    { label: "교정 수", icon: "/images/CommonComponentIcon/CorrectIcon.svg" },
  ];
  return (
    <div className="w-[700px] h-72 rounded-tl-[10px] rounded-tr-[10px] pt-5 pr-4 pl-8 gap-3 shadow-[0px_4px_30px_0px_rgba(0,0,0,0.1)] bg-white">
      {/* 우측 상단 언어 + 더보기 아이콘 */}
      <div className="flex justify-between items-center space-x-5 -translate-x-[15px]">
        {_props.userId && _props.userNickname && _props.specificData ? (
          <ProfileComponent />
        ) : (
          <div>#number//date</div>
        )}
        <div className="flex items-center gap-5">
          <span className="font-semibold justify-end text-body2 text-blue-500">
            언어
          </span>
          <img
            src="/images/more_options.svg"
            alt="더보기 아이콘"
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="flex justify-between w-full mt-6">
        <div className="flex flex-col gap-4 w-full h-25">
          {/* 공개 범위 + 제목 */}
          <div className="flex gap-3 text-subhead3 text-black">
            {/* 공개 범위 아이콘 */}
            <img src="/images/public_icon.svg" alt="전체 공개 아이콘" />
            <p className="font-bold text-lg">제목</p>
          </div>
          {/* 피드 글 */}
          <div className="text-body2 text-[#333333]">텍스트 내용</div>
          {/* 댓글수 + 좋아요 수 + 교정 수 */}
          <div className="flex gap-4 mt-12 text-body2 text-gray-700">
            {stats.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                <img
                  src={item.icon}
                  alt={`${item.label} 아이콘`}
                  className="w-4 h-4"
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 대표 사진 */}
        <div className="w-40 h-40 bg-gray-300 rounded-[10px] flex-shrink-0">
          {/* <img alt="대표 이미지" className="w-full h-full object-cover"/> */}
        </div>
      </div>
    </div>
  );
};

export default CommonComponentInDiaryNFeed;
