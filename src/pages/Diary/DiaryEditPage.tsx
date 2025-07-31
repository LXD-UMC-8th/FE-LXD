import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PrevButton from "../../components/Common/PrevButton";
import TitleHeader from "../../components/Common/TitleHeader";
import EnrollWrapper from "../../components/Diary/Writing/EnrollWrapper";
import WritingEditor from "../../components/Diary/Writing/WritingEditor";
import ValueSettingButton from "../../components/Common/ValueSettingButton";
import QuestionTitle from "../../components/Diary/Writing/QuestionTitle";
import { useThrottle } from "../../hooks/useThrottle";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { getDiaryDetail, updateDiary } from "../../apis/diary";

const DiaryEditPage = () => {
  const { diaryId } = useParams();
  const { language } = useLanguage();
  const t = translate[language];
  const navigate = useNavigate();

  const _title_free = t.titleStyle_FREE;
  const _title_question = t.titleStyle_QUESTION;

  // 상태 정의
  const [_style, setStyle] = useState<string>(_title_free);
  const [_titleName, setTitleName] = useState<string>("");
  const [_editorRawContent, setEditorRawContent] = useState<string>("");

  const _throttledEditorContent = useThrottle(_editorRawContent, 1500);
  const _throttledTitleName = useThrottle(_titleName, 500);

  // 수정 모드: 기존 일기 내용 불러오기
  useEffect(() => {
    if (!diaryId) return;
    getDiaryDetail(Number(diaryId)).then((res) => {
      const d = res.result;
      setTitleName(d.title);
      setEditorRawContent(d.content);
      setStyle(d.style);
    });
  }, [diaryId]);

  // 에디터 변경 핸들러
  const handleEditorChange = (value: string) => {
    setEditorRawContent(value);
  };

  // 제목 유형 선택 핸들러
  const handleTitleValueChange = (value: string) => {
    if (value === _title_free) {
      setStyle(_title_free);
    } else {
      setStyle(_title_question);
    }
    return value;
  };

  // 수정 완료 버튼 눌렀을 때
  const handleEditSubmit = () => {
    if (!diaryId) return;

    const body = {
      title: _titleName,
      content: _editorRawContent,
      visibility: "PUBLIC",
      commentPermission: "ALL",
      language,
      style: _style,
      thumbImg: "", // 필요시 썸네일 값 추가
    };

    updateDiary({ diaryId: Number(diaryId), body }).then(() => {
      alert("일기 수정 완료!");
      navigate("/mydiary");
    }).catch((err) => {
      console.error("수정 실패", err);
      alert("수정에 실패했습니다.");
    });
  };

  return (
    <div className="py-2 bg-gray-100 mx-10">
      <div className="flex items-center gap-x-6">
        <PrevButton navigateURL="/mydiary" />
        <TitleHeader title="일기 수정" />
        <div className="ml-auto mr-6">
          <EnrollWrapper
            _titleName={_titleName}
            _editorRawContent={_editorRawContent}
            _style={_style}
            onSubmit={handleEditSubmit} // 🔥 수정 완료 핸들러 연결
          />
        </div>
      </div>

      <div className="flex flex-col items-start gap-[15px] self-stretch w-full">
        <div className="bg-white rounded-[12px] shadow mt-5 w-full p-5 gap-3">
          <ValueSettingButton
            title1={_title_free}
            title2={_title_question}
            onClick={handleTitleValueChange}
          />
          {_style === _title_free && (
            <input
              onChange={(e) => setTitleName(e.target.value)}
              type="text"
              className="w-full bg-gray-200 rounded-md p-3 mt-5"
              placeholder={t.titleInputPlaceholder}
              value={_titleName}
            />
          )}
          {_style === _title_question && (
            <QuestionTitle _titleName={_titleName} onClick={() => {}} />
          )}
        </div>

        <div className="w-full h-full mt-5">
          <WritingEditor value={_editorRawContent} onChange={handleEditorChange} />
        </div>
      </div>
    </div>
  );
};

export default DiaryEditPage;
