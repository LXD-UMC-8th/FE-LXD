interface SignupButtonProps {
  name: string;
  onClick: () => void;
  disabled: boolean;
}
const SignupButton = ({ name, onClick, disabled }: SignupButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-[69px] rounded-md 
        ${
          disabled ? "bg-gray-400" : "bg-black hover:bg-gray-800 cursor-pointer"
        }`}
    >
      <span className="text-subhead3 font-medium text-white">{name}</span>
    </button>
  );
};

export default SignupButton;
