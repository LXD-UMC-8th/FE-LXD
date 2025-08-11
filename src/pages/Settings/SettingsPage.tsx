import { useLanguage } from "../../context/LanguageProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { translate } from "../../context/translate";

const SettingsPage = () => {
  const { language } = useLanguage();
  const t = translate[language];
  const queryClient = useQueryClient();
  const { data: myInfo } = useQuery({
    queryKey: ["myInfo"],
    queryFn: () => Promise.resolve(queryClient.getQueryData(["myInfo"])),
    enabled: false,
  });
  console.log(myInfo);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-3/5 p-3 mb-5">
        <p className="text-4xl font-bold">{t.settingTitle}</p>
      </div>
      <div className="bg-white w-3/5 h-80 rounded-2xl">
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
                <li className="font-bold">시스템 언어</li>
              </ul>

              <ul className="space-y-5 ">
                <li>{data?.nativelanguage}</li>
                <li>{data?.studylanguage}</li>
                <li>
                  <select
                    className="border rounded-md px-3 py-2 bg-gray-100"
                    aria-label="시스템 언어 선택"
                  >
                    <option>한국어</option>
                    <option>English</option>
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
