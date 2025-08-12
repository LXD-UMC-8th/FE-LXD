import type { diaries } from "../../utils/types/diary";

const Header = ({ props }: { props: diaries }) => {
  return (
    <div className="flex gap-3 text-subhead3 text-black">
      {props.visibility === "PUBLIC" && props.language === "KO" && (
        <img src="/images/public_icon_ko.svg" alt="전체 공개 아이콘" />
      )}
      {props.visibility === "PUBLIC" && props.language === "EN" && (
        <img src="/images/public_icon_en.svg" alt="all icon" />
      )}
      {props.visibility === "FRIENDS" && props.language === "KO" && (
        <img src="/images/friend_icon_ko.svg" alt="친구 공개 아이콘" />
      )}
      {props.visibility === "FRIENDS" && props.language === "EN" && (
        <img src="/images/friend_icon_en.svg" alt="friends icon" />
      )}
      {props.visibility === "PRIVATE" && props.language === "KO" && (
        <img src="/images/private_icon_ko.svg" alt="비공개 아이콘" />
      )}
      {props.visibility === "PRIVATE" && props.language === "EN" && (
        <img src="/images/private_icon_en.svg" alt="private icon" />
      )}
      <p className="font-bold text-lg">{props.title}</p>
    </div>
  );
};

export default Header;
