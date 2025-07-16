interface ProfileModalProps {
    onClose: () => void;
}

const NavProfileModal = ({onClose}: ProfileModalProps) => {
  return (
    <div className="w-50 h-45 border-1 border-gray-300 bg-white rounded-[10px] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.1)]">
      <img 
        src="/images/DeleteButton.svg" 
        alt="창 닫기 버튼"
        className="p-3 cursor-pointer"
        onClick = {onClose}
      />
      
    </div>
  )
}

export default NavProfileModal
