import prevvector from "../../../public/images/prevvector.svg";
import { useNavigate, useLocation } from "react-router-dom";

interface PrevButtonProps {
  navigateURL: string | number;
  preserveSearch?: boolean;
}

const PrevButton = ({ navigateURL, preserveSearch = true }: PrevButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const canGoBack = typeof window !== "undefined" && !!window.history?.state && window.history.state.idx > 0;

  const handleNavigate = () => {
    if (canGoBack) {
      navigate(-1);
      return;
    }

    if (typeof navigateURL === "number") {
      navigate(navigateURL);
    } else {
      navigate({
        pathname: navigateURL,
        search: preserveSearch ? location.search : undefined, // ?tab=... 유지
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
