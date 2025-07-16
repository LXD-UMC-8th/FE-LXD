import ProfileComponent from "./ProfileComponent"


const CorrectionComponent = () => {
  return (
    <div className="w-200 h-81 bg-white rounded-[10px] border border-gray-300">
      <div className="flex items-center gap-125">
        <ProfileComponent />
        <img 
            src="/images/EmptyHeartIcon.svg" 
            alt="빈 하트" 
            className="w-6 h-6 ml-2"
        />
      </div>
    </div>
  )
}

export default CorrectionComponent
