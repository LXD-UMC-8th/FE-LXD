import { useEffect, useState } from "react";
import PrevButton from "../../components/Common/PrevButton";
import CorrectionsInFeedDetail from "../../components/Diary/CorrectionsInDiaryDetail";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import DiaryContent from "../../components/Diary/DiaryContent";
import LoadingModal from "../../components/Common/LoadingModal";
import type { ContentsDTO } from "../../utils/types/correction";
import { useGetCorrections } from "../../hooks/mutations/useGetCorrections";
import { useGetDiaryDetail } from "../../hooks/mutations/useGetDiaryDetail";
import type { DiaryUploadResult } from "../../utils/types/diary";
import { usePostDiaryComments } from "../../hooks/mutations/DiaryComment/usePostDiaryComments";
import { useGetDiaryComments } from "../../hooks/mutations/DiaryComment/useGetDiaryComments";
import { useDeleteDiaryComments } from "../../hooks/mutations/DiaryComment/useDeleteDiaryComments";

const DiaryDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { diaryId } = useParams<{ diaryId?: string }>();
  const parsedDiaryId = Number(diaryId);
  const hasValidId = diaryId !== undefined && !Number.isNaN(parsedDiaryId);

  // PrevButton이 number를 허용하지 않으면 -1 대신 문자열만 넘기자.
  const backURL = location.state?.from === "profile" ? -1 : "/feed";

  // ✅ index 대신 commentId로 관리
  const [openReplyId, setOpenReplyId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");

  // 답글 입력값을 댓글ID별로 관리
  const [replyTexts, setReplyTexts] = useState<Record<number, string>>({});

  const _toggleReplyInput = (id: number) => {
    setOpenReplyId((prev) => (prev === id ? null : id));
  };

  const _handleCorrectionsClick = () => {
    navigate(`/feed/${parsedDiaryId}/corrections`);
  };

  /** 교정 댓글 조회 */
  const {
    mutate: fetchCorrections,
    data: correctionData,
    isPending: isCorrectionsPending,
  } = useGetCorrections();

  /** 일기 상세 조회 */
  const {
    mutate: fetchDiaryDetail,
    data: diaryData,
    isPending: isDiaryPending,
  } = useGetDiaryDetail();

  /**  일기 댓글 목록 조회 */
  const {
    mutate: fetchDiaryComments,
    data: commentData,
    isPending: isCommentsPending,
  } = useGetDiaryComments();

  /** 일기 댓글 작성(댓글/답글 공통) */
  const { mutate: postDiaryComment, isPending: isPostingComment } = usePostDiaryComments();

  /** 일기 댓글 삭제 */
  const { mutate: deleteDiaryComment, isPending: isDeletingComment } = useDeleteDiaryComments();

  useEffect(() => {
    if (!hasValidId) return;
    fetchDiaryDetail({ diaryId: parsedDiaryId });
    fetchCorrections({ diaryId: parsedDiaryId, page: 1, size: 10 });
    fetchDiaryComments({ diaryId: parsedDiaryId, page: 0, size: 20 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasValidId, parsedDiaryId]);

  // 잘못된 접근 처리
  if (!hasValidId) {
    return (
      <div>
        <div>
          잘못된 접근입니다.
          <button onClick={() => navigate("/feed")}>피드로 돌아가기</button>
        </div>
      </div>
    );
  }

  /** 댓글 등록 (최상위) */
  const _handleSubmitComment = () => {
    const text = commentText.trim();
    if (!text) return;

    postDiaryComment(
      {
        diaryId: parsedDiaryId,
        parentId: null, // 최상위 댓글
        commentText: text,
      },
      {
        onSuccess: (data) => {
          console.log("POST ok diaryId?", data.result.diaryId);
          fetchDiaryComments({ diaryId: parsedDiaryId, page: 0, size: 20 });
        },
      }
    );
  };

  /** 답글 입력 변경 */
  const _handleReplyChange = (commentId: number, v: string) => {
    setReplyTexts((prev) => ({ ...prev, [commentId]: v }));
  };

  /** 답글 등록 */
  const _handleSubmitReply = (parentCommentId: number) => {
    const text = (replyTexts[parentCommentId] ?? "").trim();
    if (!text) return;

    postDiaryComment(
      {
        diaryId: parsedDiaryId,
        parentId: parentCommentId, // 부모 댓글의 commentId → 답글
        commentText: text,
      },
      {
        onSuccess: () => {
          setReplyTexts((prev) => ({ ...prev, [parentCommentId]: "" }));
          fetchDiaryComments({ diaryId: parsedDiaryId, page: 0, size: 20 });
        },
      }
    );
  };

  /** 댓글 삭제 */
  const _handleDeleteComment = (commentId: number) => {
    deleteDiaryComment(
      { diaryId: parsedDiaryId, commentId },
      {
        onSuccess: () => {
          fetchDiaryComments({ diaryId: parsedDiaryId, page: 0, size: 20 });
        },
      }
    );
  };

  const comments = commentData?.result?.content ?? [];
  const commentTotal = commentData?.result?.totalElements ?? comments.length;

  /** 로딩 처리 */
  if (isDiaryPending) return <LoadingModal />;

  const diary: DiaryUploadResult | undefined = diaryData?.result;

  /** ✅ 대댓글(재귀) 렌더링 */
  const renderReplies = (replies: any[] = [], depth = 1) =>
    replies.map((r) => {
      const hasChildren = Array.isArray(r.replies) && r.replies.length > 0;
      return (
        <div
          key={r.commentId}
          className="mt-3 border-l border-gray-200 pl-4"
          style={{ marginLeft: depth * 12 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <img
              src={r.profileImage ?? "/images/profileimages.svg"}
              alt="프로필"
              className="w-8 h-8 rounded-full bg-gray-300"
            />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{r.nickname ?? "사용자"}</span>
              <div className="w-px h-4 bg-gray-500" />
              <span className="text-xs text-gray-600">@{r.username ?? "user"}</span>
              <span className="text-[11px] text-gray-500 ml-2">
                {r.createdAt ?? ""}
              </span>
            </div>
          </div>

          <p className="text-sm text-black whitespace-pre-line leading-relaxed mb-2">
            {r.content ?? r.commentText}
          </p>

          {/* 필요하면 여기에도 '답글 달기/삭제/좋아요' 버튼 추가 가능 */}

          {hasChildren ? renderReplies(r.replies, depth + 1) : null}
        </div>
      );
    });

  return (
    <div className="flex justify-center items-start mx-auto px-6 pt-6">
      <div className="w-full max-w-[750px]">
        {/* ← 뒤로가기 + 교정하기 */}
        <div className="mb-4 flex items-center justify-between">
          <PrevButton navigateURL={backURL} />
          <button
            onClick={_handleCorrectionsClick}
            className="flex items-center justify-center bg-[#4170FE] text-[#F1F5FD] font-pretendard font-bold text-sm h-[43px] w-[118.7px] rounded-[5px] px-[12px] pr-[20px] gap-[10px] hover:scale-105 duration-300 cursor-pointer"
          >
            <img
              src="/images/correctionpencil.svg"
              alt="교정 아이콘"
              className="w-[20.7px] h-[21.06px]"
            />
            교정하기
          </button>
        </div>

        <div className="bg-white p-8 rounded-[10px]">
          {diary && (
            <DiaryContent
              title={diary.title}
              language={diary.language}
              visibility={diary.visibility}
              content={diary.content}
              profileImg={diary.profileImg}
              /* 👇 서버가 writerUserName, writerNickName 등으로 줄 수도 있으니 매핑 */
              writerUsername={
                (diary as any).writerUsername ??
                (diary as any).writerUserName ??
                (diary as any).username
              }
              writerNickname={
                (diary as any).writerNickname ??
                (diary as any).writerNickName ??
                (diary as any).nickname
              }
              stats={[
                {
                  label: String(commentTotal ?? diary.commentCount ?? 0),
                  icon: "/images/CommonComponentIcon/CommentIcon.svg",
                  alt: "댓글",
                },
                {
                  label: String(diary.likeCount ?? 0),
                  icon: "/images/CommonComponentIcon/LikeIcon.svg",
                  alt: "좋아요",
                },
                {
                  label: String(diary.correctCount ?? 0),
                  icon: "/images/CommonComponentIcon/CorrectIcon.svg",
                  alt: "교정",
                },
              ]}
            />
          )}

          {/* 댓글 전체 래퍼 카드 */}
          <div className="mt-10 bg-white rounded-[10px] p-6">
            <div className="flex items-center gap-2 text-black font-semibold text-[17px] mb-5">
              <img
                src="/images/commentIcon.svg"
                alt="댓글 아이콘"
                className="w-[24px] h-[24px]"
              />
              <span>댓글 ({commentTotal})</span>
            </div>

            {/*  댓글 입력창 */}
            <div className="mb-5">
              <textarea
                placeholder="댓글을 입력하세요."
                className="w-full text-sm text-gray-800 bg-gray-50 resize-none border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gray-200"
                rows={4}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    _handleSubmitComment();
                  }
                }}
                disabled={isPostingComment}
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={_handleSubmitComment}
                  disabled={isPostingComment || !commentText.trim()}
                  className={`bg-gray-900 text-white text-sm px-4 py-[6px] rounded-lg text-caption font-semibold cursor-pointer ${
                    isPostingComment || !commentText.trim()
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-800"
                  }`}
                >
                  {isPostingComment ? "등록 중..." : "등록"}
                </button>
              </div>
            </div>

            {/* 댓글 로딩 */}
            {isCommentsPending && <LoadingModal />}

            {/* 댓글 리스트 */}
            {comments.map((c: any) => {
              const hasReplies = Array.isArray(c.replies) && c.replies.length > 0;
              return (
                <div key={c.commentId} className="border border-gray-200 rounded-lg p-5 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={c.profileImage ?? "/images/profileimages.svg"}
                      alt="프로필"
                      className="w-9 h-9 rounded-full bg-gray-300"
                    />
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-body2">
                          {c.nickname ?? "사용자"}
                        </span>
                        <div className="w-px h-5 bg-gray-500" />
                        <span className="text-xs text-gray-600">
                          @{c.username ?? "user"}
                        </span>
                      </div>
                      <p className="text-caption text-gray-500">
                        {c.createdAt ?? ""}
                      </p>
                    </div>
                  </div>

                  <p className="text-body2 text-black whitespace-pre-line leading-relaxed mb-4">
                    {c.content ?? c.commentText}
                  </p>

                  {/* 대댓글 리스트 */}
                  {hasReplies ? renderReplies(c.replies) : null}

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-2 mt-3">
                    {/* 답글 토글 */}
                    <div
                      className={`flex items-center gap-1 cursor-pointer p-1 ${
                        openReplyId === c.commentId ? "bg-gray-200 rounded-[5px] text-black" : ""
                      }`}
                      onClick={() => _toggleReplyInput(c.commentId)}
                    >
                      <img src="/images/commentIcon.svg" alt="댓글 수" className="w-4 h-4" />
                      <span>{c.replyCount ?? (c.replies?.length ?? 0)}</span>
                    </div>

                    {/* 좋아요 */}
                    <div className="flex items-center gap-1">
                      <img
                        src="/images/CommonComponentIcon/LikeIcon.svg"
                        alt="좋아요 수"
                        className="w-4 h-4"
                      />
                      <span>{c.likeCount ?? 0}</span>
                    </div>

                    {/* 삭제 버튼 */}
                    <button
                      onClick={() => _handleDeleteComment(c.commentId)}
                      disabled={isDeletingComment}
                      className="ml-auto px-2 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                    >
                      {isDeletingComment ? "삭제 중..." : "삭제"}
                    </button>
                  </div>

                  {/* 답글 입력 영역 */}
                  {openReplyId === c.commentId && (
                    <div className="mt-3">
                      <textarea
                        placeholder="답글을 입력하세요."
                        className="w-full bg-gray-50 text-sm text-gray-800 resize-none border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        rows={3}
                        value={replyTexts[c.commentId] ?? ""}
                        onChange={(e) => _handleReplyChange(c.commentId, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            _handleSubmitReply(c.commentId);
                          }
                        }}
                        disabled={isPostingComment}
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() => _handleSubmitReply(c.commentId)}
                          disabled={isPostingComment || !(replyTexts[c.commentId]?.trim())}
                          className="bg-gray-900 text-white text-sm px-4 py-[6px] rounded-lg text-caption font-semibold hover:bg-gray-800 hover:cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isPostingComment ? "등록 중..." : "등록"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 오른쪽 교정 영역 */}
      <div className="flex flex-col px-5 gap-3">
        <p className="text-subhead3 font-semibold py-3">작성된 교정</p>

        {isCorrectionsPending && <LoadingModal />}

        {(correctionData?.result?.corrections?.contents ?? []).map(
          (correction: ContentsDTO) => (
            <CorrectionsInFeedDetail key={correction.correctionId} props={correction} />
          )
        )}
      </div>
    </div>
  );
};

export default DiaryDetailPage;
