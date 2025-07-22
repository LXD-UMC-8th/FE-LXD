import { useState } from "react";
import useWritingSubmit from "../../hooks/useWritingSubmit";

interface EnrollModalProps {
  _onClose?: () => void;
  _titleName: string;
  _editorRawContent: string;
  _style: "FREE" | "QUESTION";
}

const EnrollModal = ({
  _titleName,
  _editorRawContent,
  _style,
}: EnrollModalProps) => {
  const [visibility, setVisibility] = useState<"PUBLIC" | "FRIEND" | "PRIVATE">(
    "PUBLIC",
  );
  const [commentPermission, setCommentPermission] = useState<
    "PUBLIC" | "FRIEND" | "PRIVATE"
  >("PUBLIC");

  const { submitWriting } = useWritingSubmit({
    title: _titleName,
    content: _editorRawContent,
    style: _style,
    visibility: visibility,
    commentPermission: commentPermission,
    language: "ko", // Example language, adjust as needed
    thumbImg: "", // Example thumbnail image, adjust as needed
  });

  const handleSubmit = () => {
    //최종 API전송할 때 이용되는 함수임
    //마지막으로 여기서 전송하는 게 나을 것 같긴 함.
    // submitWriting();
    console.log({ submitWriting });
  };

  return (
    <div className="w-[300px] p-6 bg-white rounded-xl shadow-lg">
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
            공개
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
            친구공개
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
            비공개
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
              checked={commentPermission === "PUBLIC"}
              onChange={(e) =>
                setCommentPermission(
                  e.target.value as "PUBLIC" | "FRIEND" | "PRIVATE",
                )
              }
            />
            전체허용
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="comment"
              value="FRIEND"
              checked={commentPermission === "FRIEND"}
              onChange={(e) =>
                setCommentPermission(
                  e.target.value as "PUBLIC" | "FRIEND" | "PRIVATE",
                )
              }
            />
            친구허용
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="comment"
              value="PRIVATE"
              checked={commentPermission === "PRIVATE"}
              onChange={(e) =>
                setCommentPermission(
                  e.target.value as "PUBLIC" | "FRIEND" | "PRIVATE",
                )
              }
            />
            비허용
          </label>
        </div>
      </div>

      {/* 등록하기 버튼 */}
      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="rounded-[8px] bg-[var(--Primary-500,#4170FE)] text-white hover:bg-[var(--Primary-600,#3259D9)] px-4 py-2 transition-all duration-300"
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default EnrollModal;
