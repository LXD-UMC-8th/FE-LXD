import { Language, type TLanguage } from "./LanguageProvider";

export const translate: Record<
  TLanguage,
  {
    emailPlaceholder: string;
  }
> = {
  [Language.ENGLISH]: {
    emailPlaceholder: "Please enter your email",
  },
  [Language.KOREAN]: { emailPlaceholder: "이메일을 입력해주세요" },
};
