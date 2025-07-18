import { useState } from "react";

interface EnrollModalProps {
  onClose?: () => void;
}

const EnrollModal = (_props: EnrollModalProps) => {
  const [visibility, setVisibility] = useState("public");
  const [commentPermission, setCommentPermission] = useState("everyone");

  const handleSubmit = () => {
    //최종 API전송할 때 이용되는 함수임
    console.log("공개 설정:", visibility);
    console.log("댓글 설정:", commentPermission);
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
              value="public"
              checked={visibility === "public"}
              onChange={(e) => setVisibility(e.target.value)}
            />
            공개
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="visibility"
              value="friends"
              checked={visibility === "friends"}
              onChange={(e) => setVisibility(e.target.value)}
            />
            친구공개
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="visibility"
              value="private"
              checked={visibility === "private"}
              onChange={(e) => setVisibility(e.target.value)}
            />
            친구공개
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
              value="everyone"
              checked={commentPermission === "everyone"}
              onChange={(e) => setCommentPermission(e.target.value)}
            />
            전체허용
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="comment"
              value="friends"
              checked={commentPermission === "friends"}
              onChange={(e) => setCommentPermission(e.target.value)}
            />
            친구허용
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="comment"
              value="private"
              checked={commentPermission === "private"}
              onChange={(e) => setCommentPermission(e.target.value)}
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
