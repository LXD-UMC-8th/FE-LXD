import prevvector from "../../../public/images/prevvector.svg";
import { useNavigate } from "react-router-dom";

interface PrevButtonProps {
  navigateURL: string | number;
}

const PrevButton = ({ navigateURL }: PrevButtonProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (typeof navigateURL === "number") {
      navigate(navigateURL); // 예: -1
    } else {
      navigate(navigateURL); // 예: "/feed"
    }
  };

  return (
    <div>
      <img
        src={prevvector}
        className="cursor-pointer"
        onClick={handleNavigate}
        alt="To back"
      />
    </div>
  );
};

export default PrevButton;
