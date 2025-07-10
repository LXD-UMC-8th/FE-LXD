interface SignupButtonProps {
  name: string;
  onClick: () => void;
  disabled: boolean;
}
export const SignupButton = ({
  name,
  onClick,
  disabled,
}: SignupButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-[69px] rounded-md 
        ${
          disabled
            ? "bg-gray-400"
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        }`}
    >
      <span className="text-subhead3 font-medium text-white">{name}</span>
    </button>
  );
};
