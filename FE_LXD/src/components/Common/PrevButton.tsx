import prevvector from "../../../public/images/prevvector.svg";
import { useNavigate } from "react-router-dom";

interface PrevButtonProps {
  navigateURL: string;
}

const PrevButton = ({ navigateURL }: PrevButtonProps) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    console.log(`Navigating to: ${navigateURL}`);
    navigate(navigateURL);
  };

  return (
    <div>
      <img
        src={prevvector}
        className="cursor-pointer"
        onClick={handleNavigate}
      />
    </div>
  );
};

export default PrevButton;
