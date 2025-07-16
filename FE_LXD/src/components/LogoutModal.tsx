interface LogoutModalProps {
    onClose: () => void;
}

const LogoutModal = ({onClose}: LogoutModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-120 h-65 rounded-xl text-center">
        <div className="p-10">
            <p className="text-subhead1 font-bold">정말 로그아웃 하시겠습니까?</p>
            <p className="text-gray-700 text-body1 py-5">LXD에서 kimtaehyun0809@gmail.com 계정을 로그아웃 하시겠습니까?</p>

            <div className="flex gap-3 px-16 py-5">
                <button className="w-50 h-12 bg-primary rounded-[5px] text-white text-body1 font-medium cursor-pointer hover:scale-105 duration-300">
                    로그아웃
                </button>
                <button 
                    className="w-31 h-12 bg-onPrimary rounded-[5px] text-[#5076F3] text-body1 font-medium cursor-pointer hover:scale-105 duration-300"
                    onClick = {onClose}
                >
                    닫기
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal
