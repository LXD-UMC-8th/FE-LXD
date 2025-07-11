const CommonBaseComponent = ({ title }: { title: string }) => {
  const stats = [
    { label: "댓글수", icon: "/images/CommonComponentIcon/CommentIcon.svg"},
    { label: "좋아요 수", icon: "/images/CommonComponentIcon/LikeIcon.svg"},
    { label: "교정 수", icon: "/images/CommonComponentIcon/CorrectIcon.svg"},
  ];

  return (
    <>
      <p>{title}의 내용을 나타내는 컴포넌트</p>
      <div className="w-204 h-72 rounded-tl-[10px] rounded-tr-[10px] pt-8 pr-4 pb-8 pl-8 gap-3 shadow-[0px_4px_30px_0px_rgba(0,0,0,0.1)] bg-white">

        {/* 우측 상단 언어 + 더보기 아이콘 */}
        <div className="flex justify-end items-center space-x-5">
          <span className="font-semibold text-body2 text-blue-500">언어</span>
          <img src="/images/more_options.svg" alt="더보기 아이콘" className="cursor-pointer"/>
        </div>

        <div className="flex justify-between w-189 h-40 gap-10 mt-6">
          <div className="flex flex-col gap-4 w-141 h-25">
            {/* 공개 범위 + 제목 */}
            <div className="flex gap-3 text-subhead3 text-black">
              <img src="/images/public_icon.svg" alt="전체 공개 아이콘"/>
              <p className="font-bold text-lg">요즘 7월 루틴을 체크해보자~~</p>
            </div>
            {/* 피드 글 */}
            <div className="text-body2 text-[#333333]">
              요즘 10시쯤 자고 6시쯤 일어나는 루틴을 유지하려고 하는 중. 아직 완벽하진 않은데, 일찍 자려는 의식이 생긴 것만으로도 괜찮은 변화 같음. 아침에 일어나서 제일 먼저 물 한 잔 마시고 스트레칭. 그다음엔 노트에 오늘 할 일 몇 개 써본다. 이거라도 안 하면 하루가 금방 흐트러짐.
            </div>
            {/* 댓글수 + 좋아요 수 + 교정 수 */}
            <div className="flex gap-4 mt-4 text-body2 text-gray-700">
              {stats.map((item, index) => (
                <div key={index} className="flex items-center gap-1">
                  <img src={item.icon} alt={`${item.label} 아이콘`} className="w-4 h-4"/>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 대표 사진 */}
          <div className="w-43 h-43 bg-gray-300 rounded-[10px]">
            {/* <img alt="대표 이미지" className="w-full h-full object-cover"/> */}
          </div>
        </div>

      </div>
    </>
  );
};

export default CommonBaseComponent;
