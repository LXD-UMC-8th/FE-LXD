import PrevButton from "../../components/PrevButton";
import TitleHeader from "../../components/TitleHeader";
import ValueSettingButton from "../../components/ValueSettingButton";
import EnrollWrapper from "../../components/WritingPage/EnrollWrapper";
import WritingEditor from "../../components/WritingPage/WritingEditor";
import { useState, useEffect } from "react";

const WritingPage = () => {
  const _title_free = "자유글";
  const _title_question = "질문글";
  const [value, setValue] = useState<string>(_title_free);
  const [_freeTitle, setFreeTitle] = useState<string>(""); // 자유글 제목 -> api로 전송해야 함.

  const handleValueChange = (value: string) => {
    if (value === _title_free) {
      setFreeTitle(""); // 자유글 선택 시 제목 초기화
      setValue(_title_free);
    } else {
      setValue(_title_question);
    }
    return value;
  };
  const _handleRefresh = () => {
    //질문글 재생성
    console.log("질문글 재생성");
  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="px-4 py-2 bg-gray-100">
      <div className="flex items-center gap-x-6 ">
        <PrevButton navigateURL="/mydiary" />
        <TitleHeader title="글쓰기" />
        <div className="ml-auto mr-6">
          <EnrollWrapper />
        </div>
      </div>
      <div className=" flex flex-col items-start p-5 gap-[15px] self-stretch w-full">
        {/*자유글 / 질문글 구분 영역*/}
        <div className="bg-white rounded-[12px] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] mt-5 w-full p-5 gap-3">
          <ValueSettingButton
            title1={_title_free}
            title2={_title_question}
            onClick={handleValueChange}
          />
          {value === "자유글" && (
            <input
              onChange={(e) => setFreeTitle(e.target.value)}
              type="text"
              className="w-full bg-gray-200 rounded-md p-3 mt-5"
              placeholder="제목을 입력하세요."
            ></input>
          )}
          {value === "질문글" && (
            <div className="w-full flex items-center justify-between rounded-lg gap-5">
              <div className="w-full bg-gray-200 rounded-md p-3 mt-5">
                질문글 생성기
              </div>
              <div>
                <button
                  className="group w-25 mt-5 p-2 h-12 flex items-center gap-1  border border-gray-300 hover:border-gray-700 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition cursor-pointer"
                  onClick={_handleRefresh}
                >
                  {/* 정상 아이콘: 기본에선 보이고, hover 시 숨김 */}
                  <div className="relative h-5 flex-shrink-0">
                    <div className="left-0 w-5 h-5">
                      <img
                        src="/images/refreshvector.svg"
                        alt="새로고침 아이콘"
                        className="absolute w-5 h-5 object-contain transition-opacity duration-200 opacity-100 group-hover:opacity-0"
                      />
                      <img
                        src="/images/refreshvectorhover.svg"
                        alt="새로고침 아이콘"
                        className="absolute w-5 h-5 object-contain transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                      />
                    </div>
                  </div>
                  <span className="">새로고침</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-full mt-5 ">
          {/*글쓰기 영역*/}
          <WritingEditor />
        </div>
      </div>
    </div>
  );
};

export default WritingPage;
