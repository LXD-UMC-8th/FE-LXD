interface IDButtonProps {
  name: string;
  onClick: () => void;
  disabled: boolean;
}

const IDButton = ({ name, onClick, disabled }: IDButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-[135px] h-[55px] flex justify-center items-center 
      mt-[34px] rounded-md 
      ${disabled ? "bg-gray-300" : "bg-blue-100 cursor-pointer"}`}
    >
      <span
        className={`text-subhead3  font-medium
        ${disabled ? "text-gray-600" : "text-primary-500"}`}
      >
        {name}
      </span>
    </button>
  );
};

export default IDButton;
