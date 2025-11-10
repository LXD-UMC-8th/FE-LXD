import prevvector from "../../../public/images/prevvector.svg";
import { useNavigate, useLocation } from "react-router-dom";

interface PrevButtonProps {
  navigateURL: string | number;
  preserveSearch?: boolean;
}

const PrevButton = ({
  navigateURL,
  preserveSearch = true,
}: PrevButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = () => {
    if (window.history.length > 2) {
      navigate(-1);
      return;
    }

    if (typeof navigateURL === "number") {
      navigate(navigateURL);
    } else {
      navigate({
        pathname: navigateURL,
        search: preserveSearch ? location.search : undefined,
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
