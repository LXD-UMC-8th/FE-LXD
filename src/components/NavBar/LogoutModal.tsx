import { useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

interface LogoutModalProps {
  onClose: () => void;
}

const LogoutModal = ({ onClose }: LogoutModalProps) => {
  const { language } = useLanguage();
  const t = translate[language];
  const ref = useRef<HTMLDivElement | null>(null);
  useOutsideClick(ref, onClose);
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div ref={ref} className="bg-white w-120 h-65 rounded-xl text-center">
        <div className="p-10">
          <p className="text-subhead1 font-bold">{t.WantToLogOut}</p>
          <p className="text-gray-700 text-body1 py-5">
            {t.LogOutStatementFront} {t.LogOutStatementBack}
          </p>

          <div className="flex gap-3 px-16 py-5">
            <button
              onClick={() => {
                alert(t.logoutAlert);
                navigate("/home");
              }}
              className="w-50 h-12 bg-primary rounded-[5px] text-white text-body1 font-medium cursor-pointer hover:scale-105 duration-300"
            >
              {t.SignOut}
            </button>

            <button
              className="w-31 h-12 bg-onPrimary rounded-[5px] text-[#5076F3] text-body1 font-medium cursor-pointer hover:scale-105 duration-300"
              onClick={onClose}
            >
              {t.Close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
