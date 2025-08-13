import PrevButton from "../../components/Common/PrevButton";
import TitleHeader from "../../components/Common/TitleHeader";
import ValueSettingButton from "../../components/Common/ValueSettingButton";
import EnrollWrapper from "../../components/Diary/Writing/EnrollWrapper";
import WritingEditor from "../../components/Diary/Writing/WritingEditor";
import { useState, useEffect } from "react";
import QuestionTitle from "../../components/Diary/Writing/QuestionTitle";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { getDiaryRandomQuestion } from "../../apis/diary";
import useDebounce from "../../hooks/queries/useDebounce";

const WritingPage = () => {
  const { language } = useLanguage();
  const t = translate[language];
  const _title_free = t.titleStyle_FREE;
  const _title_question = t.titleStyle_QUESTION;
  const [_style, setStyle] = useState<string>(
    () => localStorage.getItem("style") ?? "FREE"
  );

  const [_titleName, setTitleName] = useState<string>(
    () => localStorage.getItem("title") ?? ""
  );

  const _DebounceTitleName = useDebounce(_titleName, 500);

  //Title name을 debounce를 이용하여 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("title", _DebounceTitleName);
  }, [_DebounceTitleName]);

  //Editor content을 debounce를 이용하여 localStorage에 저장
  const [_editorRawContent, setEditorRawContent] = useState<string>(
    () => localStorage.getItem("content") ?? ""
  );
  const _debounceEditorContent = useDebounce(_editorRawContent, 500);
  useEffect(() => {
    localStorage.setItem("content", _debounceEditorContent);
    console.log(localStorage.getItem("content"));
  }, [_debounceEditorContent]);
  const handleEditorChange = (value: string) => {
    setEditorRawContent(value);
  };

  const handleTitleValueChange = (value: string) => {
    localStorage.setItem("title", "");
    setTitleName("");
    localStorage.setItem("style", "");
    if (value === _title_free) {
      setStyle(t.titleStyle_FREE);
      localStorage.setItem("style", t.titleStyle_FREE);
    } else {
      setStyle(t.titleStyle_QUESTION);
      localStorage.setItem("style", t.titleStyle_QUESTION);
    }

    return value;
  };

  const _handleRefresh = () => {
    localStorage.setItem("title", "");
    getDiaryRandomQuestion({ language }).then((data) => {
      console.log("새로운 질문:", data);
      setTitleName(data.result.content);
      localStorage.setItem("title", data.result.content);
    });
  };
  if (_style === "QUESTION" || _style === "질문글") {
  }

  return (
    <div className="py-2 bg-gray-100 mx-10">
      <div className="flex items-center gap-x-6">
        <PrevButton navigateURL="/mydiary" />
        <TitleHeader title={t.writingHeader} />
        <div className="ml-auto mr-6">
          <EnrollWrapper
            _titleName={_titleName}
            _editorRawContent={_editorRawContent}
            _style={_style}
          />
        </div>
      </div>
      <div className="flex flex-col items-start gap-[15px] self-stretch w-full">
        <div className="bg-white rounded-[12px] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] mt-5 w-full p-5 gap-3">
          <ValueSettingButton
            title1={_title_free}
            title2={_title_question}
            onClick={handleTitleValueChange}
          />
          {(_style === "FREE" || _style === "자유글") && (
            <input
              value={_titleName}
              onChange={(e) => setTitleName(e.target.value)}
              type="text"
              className="w-full bg-gray-200 rounded-md p-3 mt-5"
              placeholder={t.titleInputPlaceholder}
            ></input>
          )}
          {(_style === "QUESTION" || _style === "질문글") && (
            <QuestionTitle _titleName={_titleName} onClick={_handleRefresh} />
          )}
        </div>

        <div className="w-full h-full mt-5 ">
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
