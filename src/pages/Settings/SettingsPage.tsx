import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { useMemberLanguage } from "../../hooks/queries/useMember";

const SettingsPage = () => {
  const { language } = useLanguage();
  const t = translate[language];
  const { data } = useMemberLanguage();
  console.log(data);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative p-3 mb-5">
        <p className="text-4xl font-bold">{t.settingTitle}</p>
      </div>
      <div className="bg-white w-3/5 h-80 rounded-2xl min-w-[400px]">
        <div className="p-3">
          <div className="p-6">
            <div className="mb-6">
              <p className="font-bold">언어 설정</p>
            </div>
            <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-x-8 items-start">
              {/* Left column: labels */}
              <ul className="space-y-5">
                <li className="font-bold">모국어</li>
                <li className="font-bold">학습 언어</li>
                <li className="font-bold last:mt-10">시스템 언어</li>
              </ul>

              <ul className="space-y-5 ">
                <li>{data?.result?.nativeLanguage}</li>
                <li>{data?.result?.studyLanguage}</li>
                <li className="last:mt-8">
                  <select
                    className="border rounded-md px-3 py-2 bg-gray-100"
                    aria-label="시스템 언어 선택"
                    value={data?.result?.systemLanguage ?? ""} // default empty if undefined
                    onChange={(e) => {
                      // handle change here if you want to update it
                      console.log("Selected system language:", e.target.value);
                    }}
                  >
                    <option value="ko">한국어</option>
                    <option value="en">English</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
