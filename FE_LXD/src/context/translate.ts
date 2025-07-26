import { Language, type TLanguage } from "./LanguageProvider";

export const translate: Record<
  TLanguage,
  {
    emailPlaceholder: string;
    modaltabtitle_total?: string;
    modaltabtitle_likes?: string;
  }
> = {
  [Language.ENGLISH]: {
    emailPlaceholder: "Please enter your email",
    modaltabtitle_total: "Total",
    modaltabtitle_likes: "Likes",
  },
  [Language.KOREAN]: {
    emailPlaceholder: "이메일을 입력해주세요",
    modaltabtitle_total: "모두",
    modaltabtitle_likes: "좋아요",
  },
};
