import { useState } from "react";
// import useWritingSubmit from "../../../hooks/queries/useWritingSubmit";
import { useLanguage } from "../../../context/LanguageProvider";
import { translate } from "../../../context/translate";
import { postDiaryUpload } from "../../../apis/diary";
import { useNavigate } from "react-router-dom";
interface EnrollModalProps {
  _onClose?: () => void;
  _titleName: string;
  _editorRawContent: string;
  _style: string;
}

//여기에 전달되는 _style값은 FREE || "자유글" or QUESTION || "질문글" 임
//자유글 ->FREE로 바꾸고, 질문글 -> QUESTION으로 바꾸어 API를 요청하여야 한다.
const EnrollModal = ({
  _titleName,
  _editorRawContent,
  _style,
}: EnrollModalProps) => {
  const { language } = useLanguage();
  const t = translate[language];
  const [visibility, setVisibility] = useState<string>("PUBLIC");
  const [commentPermission, setCommentPermission] = useState<string>("ALL");
  const navigate = useNavigate();

  const normalizeStyle = (style: string) => {
    switch (style) {
      case "자유글":
      case "FREE":
        return "FREE";
      case "질문글":
      case "QUESTION":
        return "QUESTION";
      default:
        return "FREE";
    }
  };
  const handleSubmit = () => {
    const style = normalizeStyle(_style);
    console.log(
      JSON.stringify({
        title: _titleName,
        content: _editorRawContent,
        style,
        visibility,
        commentPermission,
        language: "KO",
        thumbImg: "",
      }),
    );
    postDiaryUpload({
      title: _titleName,
      content: JSON.stringify(_editorRawContent),
      style,
      visibility,
      commentPermission,
      language: "KO",
      thumbImg: "",
    }).then((response) => {
      console.log(response);
      navigate(`diary/${response.result.diaryId}`);
    });
  };

  return (
    <div className="w-90 p-6 bg-white rounded-xl shadow-lg">
      {/* 공개 설정 */}
      <div className="mb-6">
        <h3 className="text-gray-500 font-semibold mb-3">공개 설정</h3>
        <div className="flex gap-6">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="visibility"
              value="PUBLIC"
              checked={visibility === "PUBLIC"}
              onChange={(e) =>
                setVisibility(e.target.value as "PUBLIC" | "FRIEND" | "PRIVATE")
              }
            />
            {t.visibility_PUBLIC}
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="visibility"
              value="FRIEND"
              checked={visibility === "FRIEND"}
              onChange={(e) =>
                setVisibility(e.target.value as "PUBLIC" | "FRIEND" | "PRIVATE")
              }
            />
            {t.visibility_FRIEND}
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="visibility"
              value="PRIVATE"
              checked={visibility === "PRIVATE"}
              onChange={(e) =>
                setVisibility(e.target.value as "PUBLIC" | "FRIEND" | "PRIVATE")
              }
            />
            {t.visibility_PRIVATE}
          </label>
        </div>
      </div>

      {/* 댓글 설정 */}
      <div className="mb-6">
        <h3 className="text-gray-500 font-semibold mb-3">댓글 설정</h3>
        <div className="flex gap-6 flex-wrap">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="comment"
              value="PUBLIC"
              checked={commentPermission === "ALL"}
              onChange={(e) =>
                setCommentPermission(
                  e.target.value as "ALL" | "FRIEND" | "NONE",
                )
              }
            />
            {t.commentPermission_PUBLIC}
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="comment"
              value="FRIEND"
              checked={commentPermission === "FRIEND"}
              onChange={(e) =>
                setCommentPermission(
                  e.target.value as "ALL" | "FRIEND" | "NONE",
                )
              }
            />
            {t.commentPermission_FRIEND}
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="comment"
              value="PRIVATE"
              checked={commentPermission === "NONE"}
              onChange={(e) =>
                setCommentPermission(
                  e.target.value as "ALL" | "FRIEND" | "NONE",
                )
              }
            />
            {t.commentPermission_PRIVATE}
          </label>
        </div>
      </div>

      {/* 등록하기 버튼 */}
      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="rounded-[8px] bg-[var(--Primary-500,#4170FE)] text-white hover:bg-[var(--Primary-600,#3259D9)] px-4 py-2 transition-all duration-300"
        >
          {t.enrollButtonText}
        </button>
      </div>
    </div>
  );
};

export default EnrollModal;
