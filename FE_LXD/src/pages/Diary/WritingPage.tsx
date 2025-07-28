import PrevButton from "../../components/Common/PrevButton";
import TitleHeader from "../../components/Common/TitleHeader";
import ValueSettingButton from "../../components/Common/ValueSettingButton";
import EnrollWrapper from "../../components/Diary/Writing/EnrollWrapper";
import WritingEditor from "../../components/Diary/Writing/WritingEditor";
import { useState, useEffect } from "react";
import QuestionTitle from "../../components/Diary/Writing/QuestionTitle";
import { useThrottle } from "../../hooks/useThrottle";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { getDiaryRandomQuestion } from "../../apis/diary";

const WritingPage = () => {
  const { language } = useLanguage();
  const t = translate[language];
  const _title_free = t.titleStyle_FREE;
  const _title_question = t.titleStyle_QUESTION;

  // 글쓰기 페이지에서 사용할 제목 상태
  const [_style, setStyle] = useState<string>(t.titleStyle_FREE);

  //제목 이름 상태 관리
  const [_titleName, setTitleName] = useState<string>("");
  const _ThrottledTitleName = useThrottle(_titleName, 500);
  //디버깅 용임. 나중에 배포할 땐 지우기
  useEffect(() => {
    console.log("Throttled Title Name: ", _ThrottledTitleName);
  }, [_ThrottledTitleName]);

  // 에디터 내용 변경을 반영하는하기 위함
  //useThrottle을 통해서 내용이 바뀐 뒤 1500ms 후에 _throttledEditorContent가 업데이트됨
  const [_editorRawContent, setEditorRawContent] = useState<string>("");
  const _throttledEditorContent = useThrottle(_editorRawContent, 1500);
  //디버깅 용임. 나중에 배포할 땐 지우기
  useEffect(() => {
    console.log("Throttled Editor Content: ", _throttledEditorContent);
  }, [_throttledEditorContent]);
  const handleEditorChange = (value: string) => {
    setEditorRawContent(value);
  };

  //--------------------------------------------//
  //제목 변경을 반영하는 함수
  const handleTitleValueChange = (value: string) => {
    if (value === _title_free) {
      setTitleName(""); // FREE 선택 시 제목 초기화
      setStyle(_title_free);
    } else {
      setStyle(_title_question);
    }
    return value;
  };
  const _handleRefresh = () => {
    //QUESTION 재생성
    console.log("QUESTION 재생성");

    //api연결함수 여기다가 작성해줘야함
    getDiaryRandomQuestion({ language }).then((data) => {
      console.log("새로운 질문:", data);
      setTitleName(data.result.content); // data.question에 새로운 질문이 있다고 가정
      // 여기서 data를 사용하여 필요한 작업을 수행
      // 예: setEditorRawContent(data.question); 등
    });
  };

  //나중에 지우기!!
  useEffect(() => {
    const data = getDiaryRandomQuestion({ language });
    console.log(data);
    console.log(_style);
  }, []);

  return (
    <div className="px-4 py-2 bg-gray-100">
      <div className="flex items-center gap-x-6 ">
        <PrevButton navigateURL="/mydiary" />
        <TitleHeader title="글쓰기" />
        <div className="ml-auto mr-6">
          <EnrollWrapper
            _titleName={_titleName}
            _editorRawContent={_editorRawContent}
            _style={_style}
          />
        </div>
      </div>
      <div className=" flex flex-col items-start p-5 gap-[15px] self-stretch w-full">
        {/*FREE / QUESTION 구분 영역*/}
        <div className="bg-white rounded-[12px] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] mt-5 w-full p-5 gap-3">
          <ValueSettingButton
            title1={_title_free}
            title2={_title_question}
            onClick={handleTitleValueChange}
          />
          {_style === t.titleStyle_FREE && (
            <input
              onChange={(e) => setTitleName(e.target.value)}
              type="text"
              className="w-full bg-gray-200 rounded-md p-3 mt-5"
              placeholder={t.titleInputPlaceholder}
            ></input>
          )}
          {_style === t.titleStyle_QUESTION && (
            <QuestionTitle _titleName={_titleName} onClick={_handleRefresh} />
          )}
        </div>

        <div className="w-full h-full mt-5 ">
          {/*글쓰기 영역*/}
          <WritingEditor
            value={_editorRawContent}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </div>
  );
};

export default WritingPage;
