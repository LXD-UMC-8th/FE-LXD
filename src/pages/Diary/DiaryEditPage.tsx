import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrevButton from "../../components/Common/PrevButton";
import TitleHeader from "../../components/Common/TitleHeader";
import EnrollWrapper from "../../components/Diary/Writing/EnrollWrapper";
import WritingEditor from "../../components/Diary/Writing/WritingEditor";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { getDiaryDetail } from "../../apis/diary";
import { useCleanHtml } from "../../hooks/useCleanHtml";

const DiaryEditPage = () => {
  const { diaryId } = useParams();
  const { language } = useLanguage();
  const t = translate[language];

  const [_titleName, setTitleName] = useState<string>("");
  const [_editorRawContent, setEditorRawContent] = useState<string>("");
  const [_thumbImg, setThumbImg] = useState<string>("");

  useEffect(() => {
    getDiaryDetail(Number(diaryId)).then((res) => {
      console.log(res);
      const d = res.result;
      setEditorRawContent(d.content || "");
      setTitleName(d.title || "");
      setThumbImg(d.thumbImg || "");
    });
  }, []);

  useCleanHtml(_editorRawContent);

  const handleEditorChange = (value: string) => {
    setEditorRawContent(value);
  };

  return (
    <div className="py-2 bg-gray-100 mx-10">
      <div className="flex items-center gap-x-6">
        <PrevButton navigateURL="/mydiary" />
        <TitleHeader title={t.EditDiary} />
        <div className="ml-auto mr-6">
          <EnrollWrapper
            _titleName={_titleName}
            _editorRawContent={_editorRawContent}
            thumbImg={_thumbImg}
          />
        </div>
      </div>

      <div className="flex flex-col items-start gap-[15px] self-stretch w-full">
        <div className="bg-white rounded-[12px] shadow w-full p-5 gap-3">
          <input
            onChange={(e) => {
              setTitleName(e.target.value);
              console.log("Title changed:", e.target.value);
            }}
            type="text"
            className="w-full bg-gray-200 rounded-md p-3 "
            value={_titleName}
          />
        </div>

        <div className="w-full h-full mt-5">
          <WritingEditor
            value={_editorRawContent.replace(/"/g, "")}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DiaryEditPage;
