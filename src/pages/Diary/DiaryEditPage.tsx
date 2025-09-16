import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrevButton from "../../components/Common/PrevButton";
import TitleHeader from "../../components/Common/TitleHeader";
import EnrollWrapper from "../../components/Diary/Writing/EnrollWrapper";
import WritingEditor from "../../components/Diary/Writing/WritingEditor";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { getDiaryDetail } from "../../apis/diary";
import {
  diff_match_patch,
  DIFF_INSERT,
  DIFF_DELETE,
  DIFF_EQUAL,
} from "diff-match-patch";

const DiaryEditPage = () => {
  const { diaryId } = useParams();
  const { language } = useLanguage();
  const t = translate[language];

  // JSON-escaped string decode
  const decodeOnce = (raw?: string | null) => {
    if (!raw) return "";
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "string") return parsed;
    } catch {}
    return raw;
  };

  // Quill normalize
  const normalizeHtmlForQuill = (html: string) =>
    html.replace(/src="([^"]+)"/g, (_m, url) => `src="${encodeURI(url)}"`);

  const [_titleName, setTitleName] = useState("");
  const [_editorRawContent, setEditorRawContent] = useState("");
  const [_thumbImg, setThumbImg] = useState("");
  const [originalContent, setOriginalContent] = useState("");

  useEffect(() => {
    getDiaryDetail(Number(diaryId)).then((res) => {
      const d = res.result;
      const decoded = decodeOnce(d.content || "");
      const normalized = normalizeHtmlForQuill(decoded);
      setOriginalContent(normalized); // 원본 저장
      setEditorRawContent(normalized); // 에디터 초기값
      setTitleName(d.title || "");
      setThumbImg(d.thumbImg || "");
    });
  }, [diaryId]);

  const handleEditorChange = (value: string) => {
    setEditorRawContent(value);
  };

  // HTML 태그 제거 후 plain text로 변환
  const htmlToPlain = (html: string) => {
    const withBreaks = html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n");
    const tmp = document.createElement("div");
    tmp.innerHTML = withBreaks;
    return (tmp.textContent || tmp.innerText || "").replace(/\u00A0/g, " ");
  };

  // diff → React Element 배열 반환
  const renderDiff = (origHtml: string, modHtml: string) => {
    const original = htmlToPlain(origHtml);
    const modified = htmlToPlain(modHtml);

    const dmp = new diff_match_patch();
    const diffs = dmp.diff_main(original, modified);
    dmp.diff_cleanupSemantic(diffs);
    console.log("diffs:", diffs);

    return diffs.map(([op, text], idx) => {
      if (!text) return null;
      if (op === DIFF_INSERT) {
        // 추가된 부분 → mark 태그 (노란 배경 + 파란 글씨)
        return (
          <mark
            key={idx}
            style={{
              backgroundColor: "yellow",
              color: "blue",
              fontWeight: "bold",
            }}
          >
            {text}
          </mark>
        );
      }
      if (op === DIFF_DELETE) {
        // 삭제된 부분 → 빨간색 취소선
        return (
          <span
            key={idx}
            style={{ color: "red", textDecoration: "line-through" }}
          >
            {text}
          </span>
        );
      }
      return <span key={idx}>{text}</span>;
    });
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
            type="text"
            className="w-full bg-gray-200 rounded-md p-3"
            value={_titleName}
            onChange={(e) => setTitleName(e.target.value)}
          />
        </div>

        <div className="w-full h-full mt-5">
          <WritingEditor
            value={_editorRawContent}
            onChange={handleEditorChange}
          />
        </div>

        {/* ✅ Diff Preview */}
        <div className="mt-10 p-5 bg-white rounded-[12px] shadow w-full">
          <h2 className="font-bold mb-3">결과 미리보기</h2>
          <div
            style={{
              whiteSpace: "pre-wrap", // 줄바꿈 보존
              lineHeight: "1.7",
              fontSize: "16px",
            }}
          >
            {renderDiff(originalContent, _editorRawContent)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryEditPage;
