interface IDButtonProps {
  name: string;
  onClick: () => void;
}

const IDButton = ({ name, onClick }: IDButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-[135px] h-[55px] flex justify-center items-center 
      mt-[34px] bg-gray-300 rounded-md cursor-pointer"
    >
      <span className="text-subhead3 text-gray-600 font-medium">{name}</span>
    </button>
  );
};

export default IDButton;
