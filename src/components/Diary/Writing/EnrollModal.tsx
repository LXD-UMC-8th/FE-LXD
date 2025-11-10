import { useState } from "react";
// import useWritingSubmit from "../../../hooks/queries/useWritingSubmit";
import { useLanguage } from "../../../context/LanguageProvider";
import { translate } from "../../../context/translate";
import {
  useUpdateDiary,
  useWritingSubmit,
} from "../../../hooks/mutations/useWritingSubmit";
import LoadingModal from "../../Common/LoadingModal";
import { useParams } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
interface EnrollModalProps {
  _onClose?: () => void;
  _titleName: string;
  _editorRawContent: string;
  _style?: string;
  thumbImg?: string;
}

const EnrollModal = ({
  _titleName,
  _editorRawContent,
  _style,
}: EnrollModalProps) => {
  const { diaryId } = useParams<{ diaryId: string }>();
  console.log("EnrollModal diaryId & diaryType:", diaryId, typeof diaryId);

  const { language } = useLanguage();
  const t = translate[language];
  const [visibility, setVisibility] = useState<string>("PUBLIC");
  const [commentPermission, setCommentPermission] = useState<string>("ALL");

  const { mutate: postDiaryUpload, isPending } = useWritingSubmit();
  const { mutate: updateDiary } = useUpdateDiary();

  const { isLoggedIn } = useAuth();
  const buttonText = isLoggedIn ? t.editButtonText : t.enrollButtonText;

  const normalizeStyle = (style: string) => {
    switch (style) {
      case "자유글":
      case "FREE":
        return "FREE";
      case "질문글":
      case "QUESTION":
        return "RANDOM";
      default:
        return "NONE";
    }
  };
  const handleSubmit = () => {
    const style = normalizeStyle(_style || "FREE");

    if (!_titleName) {
      alert(t.titleRequired);
      return;
    }

    if (window.location.href.includes("writing")) {
      postDiaryUpload({
        title: _titleName.trim(),
        content: _editorRawContent,
        style,
        visibility,
        commentPermission,
        language: language,
        thumbImg: localStorage.getItem("thumbImg") || "",
      });
    } else if (window.location.href.includes("edit")) {
      updateDiary({
        diaryId: Number(diaryId),
        title: _titleName.trim(),
        content: _editorRawContent,
        visibility,
        commentPermission,
        language,
        thumbImg: localStorage.getItem("thumbImg") ?? "",
      });
    }
  };

  //value값을 바꿈에 따라서 label설정이 안 됨,,
  return (
    <div className="w-90 p-6 bg-white rounded-xl shadow-lg">
      {isPending && <LoadingModal />}
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
              onChange={() => setVisibility("PUBLIC")}
            />
            {t.visibility_PUBLIC}
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="visibility"
              value="FRIENDS"
              checked={visibility === "FRIENDS"}
              onChange={() => {
                setVisibility("FRIENDS");
              }}
            />
            {t.visibility_FRIEND}
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="visibility"
              value="PRIVATE"
              checked={visibility === "PRIVATE"}
              onChange={() => {
                setVisibility("PRIVATE");
              }}
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
              name="commentPermission"
              value="PUBLIC"
              checked={commentPermission === "ALL"}
              onChange={() => setCommentPermission("ALL")}
            />
            {t.commentPermission_PUBLIC}
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="commentPermission"
              value="FRIENDS"
              checked={commentPermission === "FRIENDS"}
              onChange={() => setCommentPermission("FRIENDS")}
            />
            {t.commentPermission_FRIEND}
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="commentPermission"
              value="PRIVATE"
              checked={commentPermission === "NONE"}
              onChange={() => setCommentPermission("NONE")}
            />
            {t.commentPermission_PRIVATE}
          </label>
        </div>
      </div>

      {/* 등록하기 버튼 */}
      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="rounded-[8px] bg-[var(--Primary-500,#4170FE)] text-white hover:bg-[var(--Primary-600,#3259D9)] px-4 py-2 transition-all duration-300 cursor-pointer"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default EnrollModal;
