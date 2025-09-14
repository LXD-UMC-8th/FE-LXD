import { useContext, useState, createContext, useEffect } from "react";
import type { PropsWithChildren } from "react";
import { getMemberLanguage } from "../apis/members";

export enum Language {
  ENGLISH = "ENG",
  KOREAN = "KO",
}

export type TLanguage = Language.ENGLISH | Language.KOREAN;

interface ILanguageContext {
  language: TLanguage;
  setLanguage: (lang: TLanguage) => void;
}

export const LanguageContext = createContext<ILanguageContext | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<TLanguage>(Language.KOREAN);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const response = await getMemberLanguage();
        setLanguage(response?.result?.systemLanguage as TLanguage);
      } catch (error) {
        console.error("Error fetching language:", error);
      }
    };
    fetchLanguage();
  }, []);
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: (lang: TLanguage) => setLanguage(lang),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
