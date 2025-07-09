import ModalWithTabs from "../../components/ModalWithTabs";
import { Link } from "react-router-dom";
import pencil from "../../assets/pencil.svg";

const DiaryPage = () => {
  return (
    <div className="min-h-screen bg-gary-50">
      <div className="h-40 rounded-t-[12px] rounded-b-none bg-[var(--Primary-500,#4170FE)]">
        <div className="grid grid-cols-2 h-full px-10 ">
          <div>
            <div className="pt-20 pb-2 text-white text-2xl font-bold">
              user의 다이어리{" "}
            </div>
            <div>
              <p className="text-white text-[16px] font-normal leading-[145%] tracking-[-0.08px]">
                다이어리 / 모국어 / 친구 수
              </p>
            </div>
          </div>
          <div className="pt-20 flex justify-end items-center gap-x-6">
            <Link
              to="/diary/writing"
              className="rounded-[8px] bg-[#CFDFFF] hover:bg-[#AFCBFF] shadow-[4px_4px_10px_0px_#4170FE] p-3 flex flex-row gap-3 transition-all duration-300"
            >
              <img src={pencil} alt="pencil.img"></img>
              글쓰기
            </Link>
          </div>
        </div>
      </div>

      {/*다이어리 밑 내용 추가 구분선*/}
      <ModalWithTabs title1="모두" title2="좋아요" />
      <div></div>
    </div>
  );
};

export default DiaryPage;
