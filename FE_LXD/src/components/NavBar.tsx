const NavBar = () => {
  return (
    <div className="h-14 bg-white border-b border-gray-300 flex items-center justify-between px-6">
      {/* 로고 */}
      <div className="flex items-center gap-2 cursor-pointer">
        <img src="/images/LXD_logo.svg" alt="LXD 로고" className="w-7 h-7"/>
        <img src="/images/LXDTitleIcon.svg" alt="LXD" className="w-9 h-4"/>
      </div>

      {/* 알림 + 프로필 */}
      <div className="flex items-center gap-5">
        <img src="/images/NoticeIcon.svg" alt="알림" className="w-7 h-7 cursor-pointer"/>
        <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-300"></div>
            <div className="text-body2 font-semibold text-gray-800 cursor-pointer">이용자 님</div>
        </div>
      </div>
    </div>
  )
}

export default NavBar