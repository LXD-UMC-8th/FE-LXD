import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PrevButton from "../../components/Common/PrevButton";
import TitleHeader from "../../components/Common/TitleHeader";
import EnrollWrapper from "../../components/Diary/Writing/EnrollWrapper";
import WritingEditor from "../../components/Diary/Writing/WritingEditor";
import QuestionTitle from "../../components/Diary/Writing/QuestionTitle";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import {
  // getDiaryDetail,
  updateDiary,
} from "../../apis/diary";

const DiaryEditPage = () => {
  const { diaryId } = useParams();
  const { language } = useLanguage();
  const t = translate[language];

  const navigate = useNavigate();

  const [_style, _setStyle] = useState<string>("");
  const [_titleName, setTitleName] = useState<string>("");
  const [_editorRawContent, setEditorRawContent] = useState<string>("");

  // useEffect(() => {
  //   if (!diaryId) return;
  //   getDiaryDetail(Number(diaryId)).then((res) => {
  //     const d = res.result;
  //     setTitleName(d.title);
  //     setEditorRawContent(d.content);
  //     _setStyle(d.style); // "QUESTION" or "FREE"
  //   });
  // }, [diaryId]);

  useEffect(() => {}, []);

  const handleEditorChange = (value: string) => {
    setEditorRawContent(value);
  };

  const handleEditSubmit = () => {
    if (!diaryId) return;

    const body = {
      title: _titleName,
      content: _editorRawContent,
      visibility: "PUBLIC",
      commentPermission: "ALL",
      language,
      style: _style,
      thumbImg: "",
    };

    updateDiary(Number(diaryId), body)
      .then(() => {
        alert("일기 수정 완료!");
        navigate("/mydiary");
      })
      .catch((err) => {
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
            onSubmit={handleEditSubmit}
          />
        </div>
      </div>

      <div className="flex flex-col items-start gap-[15px] self-stretch w-full">
        <div className="bg-white rounded-[12px] shadow w-full p-5 gap-3">
          <input
            onChange={(e) => setTitleName(e.target.value)}
            type="text"
            className="w-full bg-gray-200 rounded-md p-3 "
            placeholder={t.titleInputPlaceholder}
            value={_titleName}
          />
        </div>

        <div className="w-full h-full mt-5">
          <WritingEditor
            value={_editorRawContent}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DiaryEditPage;
