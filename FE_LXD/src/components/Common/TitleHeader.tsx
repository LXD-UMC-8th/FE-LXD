interface TitleHeaderProps {
  title: string;
}

const TitleHeader = ({ title }: TitleHeaderProps) => {
  return (
    <h1 className="text-headline3 font-bold">
      {title}
    </h1>
  );
};

export default TitleHeader;
