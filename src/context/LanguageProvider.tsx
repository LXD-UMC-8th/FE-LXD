import { useContext, useState, createContext } from "react";
import type { PropsWithChildren } from "react";

export enum Language {
  ENGLISH = "EN",
  KOREAN = "KO",
}

export type TLanguage = Language.ENGLISH | Language.KOREAN;

interface ILanguageContext {
  language: TLanguage;
  setLanguage: (lang: TLanguage) => void;
}

export const LanguageContext = createContext<ILanguageContext | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<TLanguage>(Language.KOREAN);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: (lang: TLanguage) => setLanguage(lang) }}
    >
      {/*
        The setLanguage function can be modified to toggle between languages.
        For example, it could be set to switch between Language.ENGLISH and Language.KOREAN.
      */}
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
