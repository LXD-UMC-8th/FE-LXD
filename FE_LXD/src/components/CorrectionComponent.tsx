import ProfileComponent from "./ProfileComponent";

const CorrectionComponent = () => {
  return (
    <div className="w-full max-w-[800px] h-80 bg-white rounded-[10px] border border-gray-300">
      <div className="flex flex-col">
        <div className="flex items-center justify-between px-6 pt-5">
          <ProfileComponent />
          <img
            src="/images/EmptyHeartIcon.svg"
            alt="빈 하트"
            className="w-6 h-6"
          />
        </div>

        {/* 본문 */}
        <div className="flex flex-col gap-3 px-8 pt-5">
          <div className="flex gap-2">
            <div className="w-1 h-6 bg-[#4170FE]"/>
            <p className="text-body1 font-semibold">오늘<span className="text-[#4170FE]">은</span> 피자데이입니다</p>
          </div>
          <p className="text-body2">‘오늘’ 뒤의 보조사로는 ‘는’ 보다는 ‘은’이 더 적합합니다. 오늘에 종성이 있기 때문인데요. 앞말에 종성이 있다면 그 뒤에는 은이 와야합니다. 어쩌고 저쩌고 교정을 </p>
        </div>
      
        {/* 메모 */}
        <div className="flex items-center bg-gray-200 rounded-[5px] border border-gray-300 mt-8 mx-7 px-3 py-2 gap-2">
          <img
            src="/images/MemoPlusIcon.svg"
            alt="메모 추가"
            className="w-4 h-4"
          />
          <input 
            type="text"
            placeholder="메모를 추가하기"
            className="w-full h-full text-body1 text-gray-600 bg-transparent outline-none"
          />
        </div>

        <div className="border-t border-gray-300 mt-5"/>

        {/* 본문 정보 */}
        <div className="flex items-center gap-3 pt-4 mx-6 mb-4">
          {/* <img 
            src=""
            alt="대표사진"
            className="w-9 h-9 rounded-[4px]"
          /> */}
          <div className="w-9 h-9 bg-gray-300 rounded-[4px]"/>
          <p className="text-gray-700 text-body1">#63</p>
          <p className="text-gray-700 text-body1 font-medium">그냥 일상 정리하는 글</p>
          <p className="ml-auto text-gray-500 text-caption">2025. 06. 16 오후 02:44</p>
        </div>
      </div>
    </div>
  );
};

export default CorrectionComponent;