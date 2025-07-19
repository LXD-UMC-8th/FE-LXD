const ProfileComponent = () => {
  return (
    <div className="flex gap-2">
      {/* 프로필 이미지 */}
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

      <div className="flex flex-col">
        {/* 사용자 이름 + 아이디 */}
        <div className="flex gap-2 text-body2">
            <div className="font-semibold">김태현</div>
            <div className="w-px h-5 bg-gray-500"/>
            <div className="text-gray-600">@kimtaehyun</div>
        </div>

        {/* 날짜 */}
        <div className="text-[12px] text-gray-500 mt-1">
            2025. 06. 16 오후 02:44
        </div>
      </div>

    </div>
  )
}

export default ProfileComponent
