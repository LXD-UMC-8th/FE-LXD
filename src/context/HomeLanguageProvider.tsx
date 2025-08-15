import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";

export enum Language {
  ENGLISH = "ENG",
  KOREAN = "KO",
}
export type TLanguage = Language.ENGLISH | Language.KOREAN;

// localStorage 키 (HomeLayout 전용)
const HOME_LANG_STORAGE_KEY = "home.systemLanguage";

interface IHomeLanguageContext {
  language: TLanguage;
  setLanguage: (lang: TLanguage) => void;
}

const HomeLanguageContext = createContext<IHomeLanguageContext | undefined>(
  undefined
);

// 브라우저 언어를 ENG/KO로 매핑 (첫 방문 기본값 결정용)
const detectBrowserLanguage = (): TLanguage => {
  try {
    const nav = navigator?.language?.toLowerCase() || "";
    if (nav.startsWith("KO")) return Language.KOREAN;
    return Language.ENGLISH;
  } catch {
    return Language.ENGLISH;
  }
};

export const HomeLanguageProvider = ({ children }: PropsWithChildren) => {
  // 1) 초기값: localStorage → 없으면 브라우저 언어 → 없으면 ENGLISH
  const [language, setLanguageState] = useState<TLanguage>(() => {
    const saved = localStorage.getItem(HOME_LANG_STORAGE_KEY);
    if (saved === Language.ENGLISH || saved === Language.KOREAN) {
      return saved;
    }
    return detectBrowserLanguage();
  });

  // 2) 변경 시 localStorage에 지속 저장
  const setLanguage = (lang: TLanguage) => {
    setLanguageState(lang);
    localStorage.setItem(HOME_LANG_STORAGE_KEY, lang);
  };

  // 3) (선택) 쿼리스트링으로 언어 강제 지정 ?lang=ENG|KO
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const q = sp.get("lang");
    if (q === Language.ENGLISH || q === Language.KOREAN) {
      setLanguage(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <HomeLanguageContext.Provider value={value}>
      {children}
    </HomeLanguageContext.Provider>
  );
};

export const useHomeLanguage = () => {
  const ctx = useContext(HomeLanguageContext);
  if (!ctx) {
    throw new Error(
      "useHomeLanguage must be used within a HomeLanguageProvider"
    );
  }
  return ctx;
};
