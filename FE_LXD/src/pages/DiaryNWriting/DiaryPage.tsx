import DiaryHeader from "../../components/DiaryPage/DiaryHeader";
import ModalWithTabs from "../../components/ModalWithTabs";
// import diaryvector from "../../../public/images/diaryvector.svg";

const DiaryPage = () => {
  const tabvalue = [
    { value: "totalINdiary", title: "모두" },
    { value: "likeINdiary", title: "좋아요" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 w-[450px]">
      <DiaryHeader />

      {/*다이어리 밑 내용 추가 구분선*/}
      <ModalWithTabs tabvalue={tabvalue} />
      <div></div>
    </div>
  );
};

export default DiaryPage;
