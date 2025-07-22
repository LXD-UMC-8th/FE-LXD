import DiaryHeader from "../../components/DiaryPage/DiaryHeader";
import ModalWithTabs from "../../components/ModalWithTabs";
// import diaryvector from "../../../public/images/diaryvector.svg";
import CalendarModal from "../../components/DiaryPage/CalendarModal";

const DiaryPage = () => {
  const tabvalue = [
    { value: "totalINdiary", title: "모두" },
    { value: "likeINdiary", title: "좋아요" },
  ];

  return (
    <div className="relative min-h-screen bg-gray-100 w-[450px] flex flex-cols gap-20 justify-between">
      <div>
        <DiaryHeader />
        {/*다이어리 밑 내용 추가 구분선*/}
        <ModalWithTabs tabvalue={tabvalue} />
      </div>
      <div>
        <div className="top-0 bg-gray-100 z-10 mx-10">
          <CalendarModal />
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;
