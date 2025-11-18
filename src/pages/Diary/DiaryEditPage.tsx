import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrevButton from "../../components/Common/PrevButton";
import TitleHeader from "../../components/Common/TitleHeader";
import EnrollWrapper from "../../components/Diary/Writing/EnrollWrapper";
import WritingEditor from "../../components/Diary/Writing/WritingEditor";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { getDiaryDetail } from "../../apis/diary";

const DiaryEditPage = () => {
  const { diaryId } = useParams();
  const { language } = useLanguage();
  const t = translate[language];

  // Decode a JSON-escaped HTML string like "\"<p class=\\\"ql-align-right\\\">...\""
  const decodeOnce = (raw?: string | null) => {
    if (!raw) return "";
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "string") return parsed;
    } catch {
      // not a JSON string literal; return as-is
    }
    return raw;
  };

  // Normalize HTML for Quill: encode <img src> URLs so spaces don't break loading
  const normalizeHtmlForQuill = (html: string) =>
    html.replace(/src="([^"]+)"/g, (_m, url) => `src="${encodeURI(url)}"`);

  const [_titleName, setTitleName] = useState<string>("");
  const [_editorRawContent, setEditorRawContent] = useState<string>("");
  const [_thumbImg, setThumbImg] = useState<string>("");

  const handleDecode = (html: string) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  };

  const extractInsOnly = (html: string) => {
    const cleaned = html.replace(/<del[\s\S]*?<\/del>/g, "");

    const insMatch = cleaned.match(/<ins>([\s\S]*?)<\/ins>/);
    if (insMatch && insMatch[1]) {
      return insMatch[1];
    }

    return cleaned;
  };

  useEffect(() => {
    getDiaryDetail(Number(diaryId)).then((res) => {
      const d = res.result;
      const decoded = decodeOnce(d.content || "");
      const unescaped = handleDecode(decoded);
      const fullyDecoded = handleDecode(unescaped);

      const insOnly = extractInsOnly(fullyDecoded);

      const normalized = normalizeHtmlForQuill(insOnly);
      setEditorRawContent(normalized);
      setTitleName(d.title || "");
      setThumbImg(d.thumbnail || "");
    });
  }, [diaryId]);

  console.log("editor content:", _editorRawContent);

  const handleEditorChange = (value: string) => {
    setEditorRawContent(value);
  };

  return (
    <div className="py-2 bg-gray-100 mx-10">
      <div className="flex items-center gap-x-6 mb-6">
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
            value={_editorRawContent}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DiaryEditPage;
