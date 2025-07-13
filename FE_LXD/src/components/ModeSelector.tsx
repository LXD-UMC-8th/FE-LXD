interface ModeSelectorProps {
  title1: string;
  title2: string;
}

const ModeSelector = ({ title1, title2 }: ModeSelectorProps) => {
  return (
    <div className="flex gap-3 mb-2 p-2">
      <button
        className="rounded-[5px] bg-[#DDE0E4] cursor-pointer p-1 "
        data-value="{title1}"
      >
        {title1}
      </button>
      <button
        className="rounded-[5px] bg-[#DDE0E4] cursor-pointer p-1 "
        data-value="{title2}"
      >
        {title2}
      </button>
    </div>
  );
};

export default ModeSelector;
