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

  const backURL = location.state?.from === "profile" ? -1 : "/feed";

  const [openReplyIndex, setOpenReplyIndex] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");

  const _toggleReplyInput = (idx: number) => {
    setOpenReplyIndex((prev) => (prev === idx ? null : idx));
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

  /** 일기 댓글 작성 */
  const { mutate: postDiaryComment, isPending: isPostingComment } = usePostDiaryComments();

  /** 일기 댓글 삭제 */
  const { mutate: deleteDiaryComment, isPending: isDeletingComment } = useDeleteDiaryComments();

  useEffect(() => {
    if (!hasValidId) return;

    fetchDiaryDetail({ diaryId: parsedDiaryId });
    fetchCorrections({ diaryId: parsedDiaryId, page: 1, size: 10 });

    // 댓글 목록 최초 로드
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

  /** 댓글 등록 핸들러 */
  const _handleSubmitComment = () => {
    const content = commentText.trim();
    if (!content) return;

    postDiaryComment(
      { diaryId: parsedDiaryId, content },
      {
        onSuccess: () => {
          setCommentText("");
          // 등록 후 목록 새로고침
          fetchDiaryComments({ diaryId: parsedDiaryId, page: 0, size: 20 });
        },
      }
    );
  };

  /** 댓글 삭제 핸들러 */
  const _handleDeleteComment = (commentId: number) => {
    deleteDiaryComment(
      { diaryId: parsedDiaryId, commentId },
      {
        onSuccess: () => {
          // 삭제 후 목록 새로고침
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
              writerUsername={diary.writerUsername}
              writerNickname={diary.writerNickname}
              stats={[
                {
                  label: String(commentTotal ?? diary.commentCount ?? 0), // ✅ 목록 기준으로 표시
                  icon: "/images/CommonComponentIcon/CommentIcon.svg",
                  alt: "댓글",
                },
                {
                  label: diary.likeCount.toString(),
                  icon: "/images/CommonComponentIcon/LikeIcon.svg",
                  alt: "좋아요",
                },
                {
                  label: diary.correctCount.toString(),
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
                className="w-full text-sm text-gray-800 bg-gray-50 resize-none border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                rows={4}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={isPostingComment}
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={_handleSubmitComment}
                  disabled={isPostingComment || !commentText.trim()}
                  className={`bg-gray-900 text-white text-sm px-4 py-[6px] rounded-lg text-caption font-semibold transition-all duration-300 cursor-pointer ${
                    isPostingComment || !commentText.trim()
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-800 hover:scale-105"
                  }`}
                >
                  {isPostingComment ? "등록 중..." : "등록"}
                </button>
              </div>
            </div>

            {/* 댓글 로딩 */}
            {isCommentsPending && <LoadingModal />}

            {/* 댓글 리스트 */}
            {comments.map((c: any, idx: number) => (
              <div key={c.commentId ?? idx} className="border border-gray-200 rounded-lg p-5 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={c.member?.profileImageUrl ?? "/images/profileimages.svg"}
                    alt="프로필"
                    className="w-9 h-9 rounded-full bg-gray-300"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-body2">
                      {c.member?.nickname ?? "사용자"}
                    </span>
                    <div className="w-px h-5 bg-gray-500" />
                    <span className="text-xs text-gray-600">
                      @{c.member?.username ?? "user"}
                    </span>
                    <p className="text-caption text-gray-500">
                      {c.createdAt ?? ""}
                    </p>
                  </div>
                </div>

                <p className="text-body2 text-black whitespace-pre-line leading-relaxed mb-4">
                  {c.content}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                  <div
                    className={`flex items-center gap-1 cursor-pointer p-1 ${
                      openReplyIndex === idx ? "bg-gray-200 rounded-[5px] text-black" : ""
                    }`}
                    onClick={() => _toggleReplyInput(idx)}
                  >
                    <img src="/images/commentIcon.svg" alt="댓글 수" className="w-4 h-4" />
                    <span>{c.replyCount ?? 0}</span>
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

                {openReplyIndex === idx && (
                  <div className="mt-3">
                    <textarea
                      placeholder="답글을 입력하세요."
                      className="w-full bg-gray-50 text-sm text-gray-800 resize-none border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      rows={3}
                    />
                    <div className="flex justify-end mt-2">
                      <button className="bg-gray-900 text-white text-sm px-4 py-[6px] rounded-lg text-caption font-semibold hover:bg-gray-800 hover:scale-105 transition-all duration-300 cursor-pointer">
                        등록
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 오른쪽 교정 영역 */}
      <div className="flex flex-col px-5 gap-3">
        <p className="text-subhead3 font-semibold py-3">작성된 교정</p>

        {isCorrectionsPending && <LoadingModal />}

        {correctionData?.result?.corrections?.contents?.map(
          (correction: ContentsDTO) => (
            <CorrectionsInFeedDetail key={correction.correctionId} props={correction} />
          )
        )}
      </div>
    </div>
  );
};

export default DiaryDetailPage;
