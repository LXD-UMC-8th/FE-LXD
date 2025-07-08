interface TitleHeaderProps {
  title: string;
}

const TitleHeader = ({ title }: TitleHeaderProps) => {
  return (
    <h1 className="text-[32px] font-extrabold leading-[1.4] tracking-[-0.64px]">
      {title}
    </h1>
  );
};

export default TitleHeader;
