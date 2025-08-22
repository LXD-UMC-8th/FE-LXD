import prevvector from "../../../public/images/prevvector.svg";
import { useNavigate, useLocation } from "react-router-dom";

interface PrevButtonProps {
  navigateURL: string | number;
}

const PrevButton = ({ navigateURL }: PrevButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = () => {
    if (typeof navigateURL === "number") {
      navigate(navigateURL);
    } else {
      navigate({
        pathname: navigateURL,
        search: location.search,
      });
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
