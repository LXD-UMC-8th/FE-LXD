import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TabsMap from "./TabsMap";

type Tabvalue = { value: string; title: string; count?: number };
interface ModalWithTabsProps { tabvalue: Tabvalue[]; select?: number }

const ModalWithTabs = ({ tabvalue, select }: ModalWithTabsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const defaultValue = useMemo(
    () => tabvalue[(select ?? 0)]?.value ?? tabvalue[0]?.value,
    [tabvalue, select]
  );

  const search = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const activeValue = search.get("tab") ?? defaultValue;

  const setTab = (value: string) => {
    const next = new URLSearchParams(location.search);
    next.set("tab", value);
    navigate({ pathname: location.pathname, search: next.toString() });
  };

  const isActive = (v: string) => v === activeValue;

  return (
    <div className="w-full">
      <div className="flex space-x-10 pt-5 px-4 border-b border-gray-300">
        {tabvalue.map(({ value, title, count }) => (
          <button
            key={value}
            type="button"
            className="pb-2 text-sm font-semibold relative cursor-pointer"
            onClick={() => setTab(value)}
          >
            <div className="inline-flex items-center pointer-events-none">
              <span>{title}</span>
              {count !== undefined && (
                <span className={`ml-1 text-xs rounded py-0.5 font-medium px-2
                  ${isActive(value) ? "bg-gray-400 text-gray-900" : "bg-gray-300 text-gray-500"}`}>
                  {count}
                </span>
              )}
            </div>
            <span className={`pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gray-700 transition-all duration-300 ${
              isActive(value) ? "w-12 opacity-100" : "w-0 opacity-0"
            }`} />
          </button>
        ))}
      </div>

      <div className="pt-5">
        {tabvalue.map((t) => isActive(t.value) ? <TabsMap key={t.value} tabvalue={t} /> : null)}
      </div>
    </div>
  );
};

export default ModalWithTabs;
