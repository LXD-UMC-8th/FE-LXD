import { useState } from "react";
import { useLanguage, type TLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { useMemberLanguage } from "../../hooks/queries/useMember";
import { usePatchLanguage } from "../../hooks/mutations/usePatchLanguage";

const SettingsPage = () => {
  const { language, setLanguage } = useLanguage();
  const t = translate[language];
  const { data } = useMemberLanguage();
  console.log(data);
  const [isLanguage, setIsLanguage] = useState<TLanguage>(language);
  const [isButton, setIsButton] = useState<boolean>(false);
  const { mutate: patchLanguage } = usePatchLanguage();

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Selected system language:", e.target.value);
    setIsLanguage(e.target.value as TLanguage);
    if (e.target.value !== data?.result.systemLanguage) {
      setIsButton(true);
    } else {
      setIsButton(false);
    }
  };
  const handlerLanguageChange = () => {
    console.log("Language changed to:", isLanguage);
    setLanguage(isLanguage as TLanguage);
    patchLanguage(isLanguage);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex p-3 mb-5 justify-start">
        <p className="text-4xl font-bold">{t.settingTitle}</p>
      </div>
      <div className="w-3/5 h-80 rounded-2xl min-w-[400px]">
        <div className="bg-white">
          <div className="p-3">
            <div className="p-6">
              <div className="mb-6">
                <p className="font-bold">{t.setLanguage}</p>
              </div>
              <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-x-8 items-start">
                {/* Left column: labels */}
                <ul className="space-y-5 w-50 mr-5">
                  <li className="font-bold">{t.nativeLanguage}</li>
                  <li className="font-bold">{t.studyLanguage}</li>
                  <li className="font-bold last:mt-10">{t.systemLanguage}</li>
                </ul>
                <ul className="space-y-5">
                  <li>{data?.result?.nativeLanguage}</li>
                  <li>{data?.result?.studyLanguage}</li>
                  <li className="last:mt-8">
                    <select
                      className="border rounded-md px-3 py-2 bg-gray-100"
                      aria-label="select system language"
                      onChange={(e) => {
                        onChangeHandler(e);
                      }}
                    >
                      <option value="KO">한국어</option>
                      <option value="ENG">English</option>
                    </select>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full mt-30">
          <button
            disabled={!isButton}
            className={` ${
              isButton
                ? "bg-blue-500 text-white  active:bg-blue-600 cursor-pointer "
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }
            px-5 py-3 rounded-md `}
            onClick={handlerLanguageChange}
          >
            {t.SaveChange}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
