import ModalWithTabs from "../../components/ModalWithTabs";
import TitleHeader from "../../components/TitleHeader";

const DiaryPage = () => {
  return (
    <div className="min-h-screen bg-gary-50">
      <TitleHeader title="다이어리" />
      {/*다이어리 밑 내용 추가 구분선*/}
      <ModalWithTabs title1="모두" title2="좋아요" />
      <div></div>
    </div>
  );
};

export default DiaryPage;
