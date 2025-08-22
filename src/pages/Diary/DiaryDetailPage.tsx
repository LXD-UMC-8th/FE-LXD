import { useEffect, useRef, useState } from "react";
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
import { translate } from "../../context/translate";
import { useLanguage } from "../../context/LanguageProvider";
import useOutsideClick from "../../hooks/useOutsideClick";
import type {
  DiaryCommentDTO,
  DiaryCommentGetResponseDTO,
} from "../../utils/types/diaryComment";
import CommentItem from "../../components/Diary/CommentItem";

const DiaryDetailPage = () => {
  const { language } = useLanguage();
  const t = translate[language];
  const navigate = useNavigate();
  const location = useLocation();
  const { diaryId } = useParams<{ diaryId?: string }>();
  const isMyDiaryTab = location.pathname.startsWith("/mydiary");

  const parsedDiaryId = Number(diaryId);
  const hasValidId = diaryId !== undefined && !Number.isNaN(parsedDiaryId);

  const backURL = location.state?.from === "profile" ? -1 : "/feed";

  const [commentText, setCommentText] = useState("");
  const [replyTexts, setReplyTexts] = useState<Record<number, string>>({});

  const PAGE_SIZE = 10;
  const [uiPage, setUiPage] = useState(0);
  const uiToApi = (p: number) => p + 1;

  const [commentsState, setCommentState] = useState<DiaryCommentDTO[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [, setHasNext] = useState(true);
  const totalStableRef = useRef(0);

  const stableTotal = totalStableRef.current || totalElements;
  const totalPages = Math.max(1, Math.ceil(stableTotal / PAGE_SIZE));

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuWrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(menuWrapperRef, () => setOpenMenuId(null));

  const _handleCorrectionsClick = () => {
    const commentCount = commentData?.result?.totalElements ?? 0;
    const likeCount = diary?.likeCount ?? 0;
    const correctCount = diary?.correctCount ?? 0;

    navigate(`/feed/${parsedDiaryId}/corrections`, {
      state: {
        stats: { commentCount, likeCount, correctCount },
        meta: { diaryId: parsedDiaryId },
      },
    });
  };

  // 교정 댓글 조회
  const {
    mutate: fetchCorrections,
    data: correctionData,
    isPending: isCorrectionsPending,
  } = useGetCorrections();

  // 일기 상세 조회
  const {
    mutate: fetchDiaryDetail,
    data: diaryData,
    isPending: isDiaryPending,
  } = useGetDiaryDetail();

  // 일기 댓글 조회
  const {
    mutate: fetchDiaryComments,
    data: commentData,
    isPending: isCommentsPending,
  } = useGetDiaryComments();

  // 일기 댓글 작성 (댓글 + 답글)
  const { mutate: postDiaryComment, isPending: isPostingComment } =
    usePostDiaryComments();

  // 일기 댓글 작성
  const { mutate: deleteDiaryComment } = useDeleteDiaryComments();

  const loadCommentsByUiPage = (p: number) => {
    const apiPage = uiToApi(p);
    fetchDiaryComments(
      { diaryId: parsedDiaryId, page: apiPage, size: PAGE_SIZE },
      {
        onSuccess: (res: DiaryCommentGetResponseDTO) => {
          const content = res?.result?.contents ?? [];
          const total = res?.result?.totalElements ?? 0;

          setTotalElements(total);
          totalStableRef.current = total;
          setCommentState(content);

          const isLast = !res.result.hasNext;
          setHasNext(!isLast);
        },
      }
    );
  };

  useEffect(() => {
    if (!hasValidId) return;
    fetchDiaryDetail({ diaryId: parsedDiaryId });
    fetchCorrections({ diaryId: parsedDiaryId, page: 1, size: 10 });

    setUiPage(0);
    setCommentState([]);
    loadCommentsByUiPage(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasValidId, parsedDiaryId]);

  // 페이지 이동
  const goToUiPage = (p: number) => {
    if (p < 0 || p >= totalPages) return;
    setUiPage(p);
    loadCommentsByUiPage(p);
  };

  // 잘못된 접근 처리
  if (!hasValidId) {
    return (
      <div>
        <div>
          {t.WrongAccess}
          <button onClick={() => navigate("/feed")}>{t.GoBackToFeed}</button>
        </div>
      </div>
    );
  }

  // 댓글 등록
  const _handleSubmitComment = () => {
    const text = commentText.trim();
    if (!text) return;

    postDiaryComment(
      {
        diaryId: parsedDiaryId,
        parentId: null,
        commentText: text,
      },
      {
        onSuccess: () => {
          setCommentText("");
          // 최신이 0페이지(UI)라고 가정
          goToUiPage(0);
        },
      }
    );
  };

  // 댓글 + 답글 삭제
  const _handleDeleteComment = (commentId: number) => {
    deleteDiaryComment(
      { diaryId: parsedDiaryId, commentId },
      {
        onSuccess: () => {
          // 현재 페이지 재조회
          fetchDiaryComments(
            { diaryId: parsedDiaryId, page: uiToApi(uiPage), size: PAGE_SIZE },
            {
              onSuccess: (res: DiaryCommentGetResponseDTO) => {
                const content = res?.result?.contents ?? [];
                const total = res?.result?.totalElements ?? 0;

                if (content.length === 0 && uiPage > 0) {
                  const prev = uiPage - 1;
                  setUiPage(prev);
                  loadCommentsByUiPage(prev);
                } else {
                  setTotalElements(total);
                  totalStableRef.current = total;
                  setCommentState(content);
                  const isLast = !res.result.hasNext;
                  setHasNext(!isLast);
                }
              },
            }
          );
        },
      }
    );
  };

  const comments = commentsState;
  const commentTotal = stableTotal;
  const diary: DiaryUploadResult | undefined = diaryData?.result;

  // 답글 입력 변경
  const _handleReplyChange = (commentId: number, v: string) => {
    setReplyTexts((prev) => ({ ...prev, [commentId]: v }));
  };

  // 답글 등록
  const _handleSubmitReply = (parentCommentId: number) => {
    const text = (replyTexts[parentCommentId] ?? "").trim();
    if (!text) return;

    postDiaryComment(
      {
        diaryId: parsedDiaryId,
        parentId: parentCommentId,
        commentText: text,
      },
      {
        onSuccess: () => {
          setReplyTexts((prev) => ({ ...prev, [parentCommentId]: "" }));
          // 현재 페이지 유지
          goToUiPage(uiPage);
        },
      }
    );
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const focusTextarea = () => {
    textareaRef.current?.focus();
  };

  // 로딩
  if (isDiaryPending) return <LoadingModal />;

  return (
    <div className="flex justify-start items-start w-full max mx-auto px-6 pt-6 gap-6">
      <div className="flex-1 min-w-0">
        {/* 뒤로가기 + 교정하기 */}
        <div className="mb-4 flex items-center justify-between">
          <PrevButton navigateURL={backURL} />
          {!isMyDiaryTab && (
            <button
              onClick={_handleCorrectionsClick}
              className="group flex items-center justify-center bg-primary-500 text-primary-50 duration-300 font-bold text-sm h-[43px] w-[118px] rounded-[5px] px-[12px] pr-[20px] gap-[10px] cursor-pointer hover:bg-[#CFDFFF] hover:text-[#4170fe] duration-300"
            >
              <img
                src="/images/correctionpencil.svg"
                alt="correction"
                className="w-[20px] h-[21px] group-hover:hidden"
              />
              <img
                src="/images/CorrectHover.svg"
                alt="correction hover"
                className="w-[20px] h-[21px] hidden group-hover:block transition-300"
              />
              {t.CorrectButton}
            </button>
          )}
        </div>

        <div className="bg-white p-8 rounded-[10px]">
          {diary && (
            <DiaryContent
              props={diary}
              {...(diary.thumbnail ? { thumbnail: diary.thumbnail } : {})}
              focusTextarea={focusTextarea}
            />
          )}

          {/* 댓글 전체 래퍼 */}
          <div className="mt-10 bg-white rounded-[10px] p-6">
            <div className="flex items-center gap-2 text-black font-semibold text-[17px] mb-5">
              <img
                src="/images/commentIcon.svg"
                alt="댓글 아이콘"
                className="w-[24px] h-[24px]"
              />
              <span>
                {t.Comment} ({commentTotal})
              </span>
            </div>

            {/* 최상위 댓글 입력창 */}
            <div className="mb-5 relative">
              <textarea
                ref={textareaRef}
                placeholder={t.CommentPlaceholder}
                className="w-full text-sm text-gray-800 pr-[80px] bg-gray-50 resize-none border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gray-200"
                rows={3}
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
                  className={`absolute bottom-7 right-3 bg-gray-900 text-white text-sm px-4 py-2 rounded-[5px] text-caption font-semibold cursor-pointer ${
                    isPostingComment || !commentText.trim()
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-800"
                  }`}
                >
                  {t.CommentSubmit}
                </button>
              </div>
            </div>

            {/* 댓글 로딩 */}
            {isCommentsPending && <LoadingModal />}

            {/* 댓글 리스트 */}
            {comments.map((c: any) => (
              <CommentItem
                key={c.commentId}
                comment={c}
                replyTexts={replyTexts}
                onReplyChange={_handleReplyChange}
                onReplySubmit={_handleSubmitReply}
                onDelete={_handleDeleteComment}
                menuWrapperRef={menuWrapperRef}
                openMenuId={openMenuId}
                setOpenMenuId={setOpenMenuId}
                t={t}
                isPostingComment={isPostingComment}
                navigate={navigate}
              />
            ))}

            {/* 페이지네이션 */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => goToUiPage(uiPage - 1)}
                disabled={uiPage === 0 || isCommentsPending}
                className="px-3 py-1 disabled:opacity-50 cursor-pointer"
              >
                <img alt="PrevImg" src="/images/CommentsPrevButton.svg" />
              </button>

              {(() => {
                const windowSize = 5;
                const start = Math.max(
                  0,
                  Math.min(
                    uiPage - Math.floor(windowSize / 2),
                    totalPages - windowSize
                  )
                );
                const end = Math.min(totalPages - 1, start + windowSize - 1);
                const pages: number[] = [];
                for (let i = start; i <= end; i++) pages.push(i);

                return pages.map((p) => (
                  <button
                    key={p}
                    onClick={() => goToUiPage(p)}
                    disabled={isCommentsPending}
                    className={`px-3 py-1 rounded cursor-pointer ${
                      p === uiPage
                        ? "bg-gray-200 text-black"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {p + 1}
                  </button>
                ));
              })()}

              <button
                onClick={() => goToUiPage(uiPage + 1)}
                disabled={uiPage >= totalPages - 1 || isCommentsPending}
                className="px-3 py-1 disabled:opacity-50 cursor-pointer"
              >
                <img alt="NextImg" src="/images/CommentsNextButton.svg" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 교정 영역 */}
      <div className="flex flex-col px-5 gap-3">
        <div className="flex items-center gap-2">
          <img
            alt="correction image"
            src="/images/Correct.svg"
            className="w-5 h-5"
          />
          <p className="text-subhead3 font-semibold py-3">
            {t.CorrectionsInDiary}
          </p>
        </div>

        {isCorrectionsPending && <LoadingModal />}

        {(correctionData?.result?.corrections?.contents ?? []).map(
          (correction: ContentsDTO) => (
            <CorrectionsInFeedDetail
              key={correction.correctionId}
              props={correction}
            />
          )
        )}
      </div>
    </div>
  );
};

export default DiaryDetailPage;
