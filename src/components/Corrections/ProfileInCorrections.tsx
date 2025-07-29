const ProfileInCorrections = () => {
  return (
    <div className="flex items-center justify-between gap-1 p-1">
      {/* 왼쪽: 프로필 정보 */}
      <div className="flex items-center gap-2">
        {/* 프로필 사진 */}
        <div className="w-9 h-9 rounded-full bg-gray-300"/>
        {/* 사용자 이름 + 아이디 */}
        <div className="flex gap-2">
            <div className="text-body1 font-medium">김지윤</div>
            <div className="w-px h-5 bg-gray-500"/>
            <div className="text-body1 text-gray-600">@zeeyoooon</div>
        </div>
      </div>
      
      {/* 작성 시간 */}
      <div className="text-body2 text-gray-500">
        2025. 06. 16 오후 02:44
      </div>
    </div>
  )
}

export default ProfileInCorrections
