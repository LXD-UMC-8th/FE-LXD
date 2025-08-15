import { useLanguage } from "../../../context/LanguageProvider";
import { translate } from "../../../context/translate";

interface AccountInfoProps {
  _id: string;
  _email: string;
  _password: string;
  _onChangePw: () => void;
}

const AccountInfo = ({
  _id,
  _email,
  _password,
  _onChangePw,
}: AccountInfoProps) => {
  const { language } = useLanguage();
  const t = translate[language];

  return (
    <div className="flex flex-col w-full rounded-md pt-7 pb-7 pl-10 pr-10 bg-white">
      <h2 className="text-subhead2 font-semibold">{t.accountInfo}</h2>
      <div className="pt-3 text-body1">
        <div className="flex h-11 items-center">
          <div className="w-32 font-medium">{t.id}</div>
          <div className="pl-4">@{_id}</div>
        </div>
        <div className="flex h-11 items-center">
          <div className="w-32 font-medium">{t.email}</div>
          <div className="pl-4">{_email}</div>
        </div>
        <div className="flex h-11 items-center justify-between">
          <div className="flex">
            <div className="w-32 font-medium">{t.password}</div>
            <span className="pl-4">{"*".repeat(_password.length)}</span>
          </div>
          <div className="flex">
            <button
              onClick={_onChangePw}
              className="px-3 py-3 bg-gray-300 rounded 
              cursor-pointer hover:bg-gray-300"
            >
              {t.changePassword}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
