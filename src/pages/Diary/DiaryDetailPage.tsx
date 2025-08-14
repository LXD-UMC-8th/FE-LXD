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
import Avatar from "../../components/Common/Avatar";
import { translate } from "../../context/translate";
import { useLanguage } from "../../context/LanguageProvider";
import useOutsideClick from "../../hooks/useOutsideClick";
import { getLocalStorageItem } from "../../apis/axios";

const DiaryDetailPage = () => {
  const { language } = useLanguage();
  const t = translate[language];
  const navigate = useNavigate();
  const location = useLocation();
  const { diaryId } = useParams<{ diaryId?: string }>();
  const parsedDiaryId = Number(diaryId);
  const hasValidId = diaryId !== undefined && !Number.isNaN(parsedDiaryId);

  const backURL = location.state?.from === "profile" ? -1 : "/feed";

  const [openReplyId, setOpenReplyId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  const [replyTexts, setReplyTexts] = useState<Record<number, string>>({});

  // 페이지네이션
  const [page, setPage] = useState(0);
  const [commentsState, setCommentState] = useState<any[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuWrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(menuWrapperRef, () => setOpenMenuId(null));

  const totalStableRef = useRef(0);

  const PAGE_SIZE = 10;
  const stableTotal = totalStableRef.current || totalElements;
  const totalPages = Math.max(1, Math.ceil(stableTotal / PAGE_SIZE));

  const _toggleReplyInput = (id: number) => {
    setOpenReplyId((prev) => (prev === id ? null : id));
  };

  const _handleCorrectionsClick = () => {
    const commentCount =
      commentData?.result?.totalElements ??
      commentData?.result?.content?.length;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    diary?.commentCount ?? 0;

    const likeCount = diary?.likeCount ?? 0;
    const correctCount = diary?.correctCount ?? 0;

    navigate(`/feed/${parsedDiaryId}/corrections`, {
      state: {
        stats: {
          commentCount,
          likeCount,
          correctCount,
        },
        meta: {
          diaryId: parsedDiaryId,
        },
      },
    });
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

  /** 일기 댓글 목록 조회 */
  const {
    mutate: fetchDiaryComments,
    data: commentData,
    isPending: isCommentsPending,
  } = useGetDiaryComments();

  /** 일기 댓글 작성(댓글/답글 공통) */
  const { mutate: postDiaryComment, isPending: isPostingComment } =
    usePostDiaryComments();

  /** 일기 댓글 삭제 */
  const { mutate: deleteDiaryComment, isPending: isDeletingComment } =
    useDeleteDiaryComments();

  const loadCommentsPage = (p: number) => {
    fetchDiaryComments(
      { diaryId: parsedDiaryId, page: p, size: PAGE_SIZE },
      {
        onSuccess: (res: any) => {
          const content = res?.result?.content ?? [];
          const total = res?.result?.totalElements ?? 0;

          setTotalElements(total);
          totalStableRef.current = total; // 안정값 업데이트
          setCommentState(content);

          const isLast = res?.result?.last ?? ( (p + 1) * PAGE_SIZE >= total );
          setHasNext(!isLast);
        },
      }
    );
  };

  useEffect(() => {
    if (!hasValidId) return;
    fetchDiaryDetail({ diaryId: parsedDiaryId });
    fetchCorrections({ diaryId: parsedDiaryId, page: 1, size: 10 });
    setPage(0);
    setCommentState([]);
    loadCommentsPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasValidId, parsedDiaryId]);

  // 페이지 이동
  const goToPage = (p: number) => {
    if (p < 0 || p >= totalPages) return;
    setPage(p);
    loadCommentsPage(p);
  };

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

  /** 댓글 등록 */
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
        onSuccess: () => {
          setCommentText("");
          goToPage(0); // 최신이 0페이지라고 가정
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
        parentId: parentCommentId, // 부모 댓글 ID → 답글
        commentText: text,
      },
      {
        onSuccess: () => {
          setReplyTexts((prev) => ({ ...prev, [parentCommentId]: "" }));
          goToPage(page);
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
          fetchDiaryComments(
            { diaryId: parsedDiaryId, page, size: PAGE_SIZE }, // 현재 페이지 재조회
            {
              onSuccess: (res: any) => {
                const content = res?.result?.content ?? [];
                const total = res?.result?.totalElements ?? 0;

                if (content.length === 0 && page > 0) {
                  const prevPage = page - 1;
                  setPage(prevPage);
                  loadCommentsPage(prevPage);
                } else {
                  setTotalElements(total);
                  totalStableRef.current = total; // 안정값 갱신
                  setCommentState(content);
                  const isLast =
                    res?.result?.last ?? ((page + 1) * PAGE_SIZE >= total);
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
  const commentTotal = stableTotal; // 표시도 안정 total 기준

  /** 로딩 처리 */
  if (isDiaryPending) return <LoadingModal />;

  const diary: DiaryUploadResult | undefined = diaryData?.result;

  // 답글 렌더링
  const renderReplies = (replies: any[] = [], depth = 1) =>
  replies.map((r) => {
    const hasChildren = Array.isArray(r.replies) && r.replies.length > 0;
    const isMenuOpen = openMenuId === r.commentId;

    return (
      <div key={r.commentId} style={{ marginLeft: depth * 12 }}>
        <div className="border-t border-gray-200 my-4" />

        <div 
          className="flex items-center gap-3 mb-2 cursor-pointer"
          onClick={() => navigate(`/diaries/member/${r.memberId}`)}
        >
          <Avatar
            src={r.profileImage}
            alt={`${r.nickname ?? r.username ?? "profile"}의 프로필`}
            size="w-8 h-8"
          />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{r.nickname ?? "사용자"}</span>
            <div className="w-px h-4 bg-gray-500" />
            <span className="text-xs text-gray-600">@{r.username ?? "user"}</span>
          </div>
          <span className="text-[11px] text-gray-500 ml-auto">{r.createdAt ?? ""}</span>

          {/* 더보기 아이콘 + 메뉴 */}
          <div className="relative" ref={isMenuOpen ? menuWrapperRef : null}>
            <img
              src="/images/more_options.svg"
              className="w-5 h-5 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenuId((prev) => (prev === r.commentId ? null : r.commentId));
              }}
            />

            {/* 내가 쓴 답글일 때만 삭제 버튼 */}
            {Number(getLocalStorageItem("userId")) === Number(r.memberId) && isMenuOpen && (
              <div className="flex absolute top-6 left-2 z-10">
                <button
                  className="min-w-[96px] h-9 bg-white rounded-[5px] shadow-sm border border-gray-300 text-sm text-red-600 whitespace-nowrap hover:bg-gray-100 cursor-pointer px-3"
                  onClick={() => {
                    if (!confirm(t.DeleteReplyAlert)) return;
                    setOpenMenuId(null);
                    _handleDeleteComment(r.commentId);
                  }}
                >
                  {t.DeleteDiary}
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-sm text-black whitespace-pre-line leading-relaxed mb-2">
          {r.content ?? r.commentText}
        </p>

        {hasChildren ? renderReplies(r.replies, depth + 1) : null}

        <div className="flex justify-end items-center gap-1">
          <img src="/images/CommonComponentIcon/LikeIcon.svg" />
          <div className="text-body2 text-gray-700">{r.likeCount}</div>
        </div>
      </div>
    );
  });


  return (
    <div className="flex justify-center items-start mx-auto px-6 pt-6">
      <div className="w-full max-w-[750px]">
        {/* 뒤로가기 + 교정하기 */}
        <div className="mb-4 flex items-center justify-between">
          <PrevButton navigateURL={backURL} />
          <button
            onClick={_handleCorrectionsClick}
            className="group flex items-center justify-center bg-primary-500 text-primary-50 duration-300 
            font-pretendard font-bold text-sm h-[43px] w-[118px] rounded-[5px] px-[12px] pr-[20px] gap-[10px] cursor-pointer hover:bg-[#CFDFFF] hover:text-[#4170fe]"
          >
            <img
              src="/images/correctionpencil.svg"
              alt="교정 아이콘"
              className="w-[20px] h-[21px] group-hover:hidden"
            />
            <img
              src="/images/CorrectHover.svg"
              alt="교정 아이콘 hover"
              className="w-[20px] h-[21px] hidden group-hover:block transition-300"
            />
            {t.CorrectButton}
          </button>
        </div>

        <div className="bg-white p-8 rounded-[10px]">
          {diary && (
            <DiaryContent
              title={diary.title}
              lang={diary.language}
              visibility={diary.visibility}
              content={diary.content}
              profileImg={diary.profileImg}
              writerUsername={diary.writerUserName}
              writerNickname={diary.writerNickName}
              stats={[
                {
                  label: String(stableTotal),
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
              diaryId={diary.diaryId}
              createdAt={diary.createdAt ?? ""}
              {...(diary.thumbnail ? { thumbnail: diary.thumbnail } : {})}
              thumbnail={diary.thumbnail}
              memberId={diary.memberId}
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
              <span>
                {t.Comment} ({stableTotal})
              </span>
            </div>

            {/* 최상위 댓글 입력창 */}
            <div className="mb-5 relative">
              <textarea
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
                  className={`absolute bottom-7 right-3 absolute bg-gray-900 text-white text-sm px-4 py-2 rounded-[5px] text-caption font-semibold cursor-pointer ${
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
            {comments.map((c: any) => {
              const hasReplies =
                Array.isArray(c.replies) && c.replies.length > 0;

              const isMenuOpen = openMenuId === c.commentId;

              return (
                <div key={c.commentId} className="p-4">
                  <div className="border-t border-gray-200 mb-6" />
                  {/* 작성자 줄 */}
                  <div 
                    className="flex items-center gap-3 mb-2 cursor-pointer"
                    onClick={() => navigate(`/diaries/member/${c.memberId}`)}
                  >
                    <Avatar
                      src={c.profileImage}
                      alt={`${c.nickname ?? c.username ?? "profile"}의 프로필`}
                      size="w-9 h-9"
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-body2">
                        {c.nickname ?? "사용자"}
                      </span>
                      <div className="w-px h-5 bg-gray-500" />
                      <span className="text-xs text-gray-600">
                        @{c.username ?? "user"}
                      </span>
                    </div>
                    <p className="text-caption text-gray-500 ml-auto">
                      {c.createdAt ?? ""}
                    </p>

                    <div
                      className="relative"
                      ref={isMenuOpen ? menuWrapperRef : null}
                    >
                      {/* 더보기 아이콘 */}
                      <img
                        src="/images/more_options.svg"
                        className="w-5 h-5 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId((prev) =>
                            prev === c.commentId ? null : c.commentId
                          );
                        }}
                      />
                      {/* 더보기 메뉴 */}
                      { Number(getLocalStorageItem("userId")) === Number(c.memberId) &&
                        isMenuOpen && (
                        <div className="flex absolute top-6 left-2 z-10">
                          <button
                            className="min-w-[96px] h-9 bg-white rounded-[5px] shadow-sm border border-gray-300 text-sm text-red-600 whitespace-nowrap hover:bg-gray-100 cursor-pointer px-3"
                            onClick={() => {
                              if(!confirm(t.DeleteCommentAlert)) return;
                              setOpenMenuId(null);
                              _handleDeleteComment(c.commentId);
                            }
                          }
                        >
                            {t.DeleteDiary}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 본문 */}
                  <p className="text-body2 text-black whitespace-pre-line leading-relaxed mb-4">
                    {c.content ?? c.commentText}
                  </p>

                  {/* 답글/좋아요 */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 mt-3">
                    <button
                      className={`flex items-center gap-1 cursor-pointer p-1 ${
                        openReplyId === c.commentId
                          ? "bg-gray-200 rounded-[5px] text-black"
                          : ""
                      }`}
                      onClick={() => _toggleReplyInput(c.commentId)}
                    >
                      <img
                        src={
                          openReplyId === c.commentId
                            ? "/images/commentIcon.svg"
                            : "/images/CommonComponentIcon/CommentIcon.svg"
                        }
                        alt="댓글 수"
                        className="w-5 h-5"
                      />
                      <span>{c.replyCount ?? c.replies?.length ?? 0}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <img
                        src="/images/CommonComponentIcon/LikeIcon.svg"
                        alt="좋아요 수"
                        className="w-5 h-5"
                      />
                      <span>{c.likeCount ?? 0}</span>
                    </div>
                  </div>

                  {/* 답글 입력 영역 */}
                  {openReplyId === c.commentId && (
                    <div className="mt-3">
                      {hasReplies && (
                        <div className="mb-3">{renderReplies(c.replies)}</div>
                      )}
                      <div className="flex items-center gap-2">
                        <textarea
                          placeholder={t.ReplyPlaceholder}
                          className="flex-1 bg-gray-200 text-sm text-gray-800 resize-none border border-gray-300 rounded-[5px] px-3 py-2 
                                  focus:outline-none focus:ring-2 focus:ring-gray-200"
                          rows={1}
                          value={replyTexts[c.commentId] ?? ""}
                          onChange={(e) =>
                            _handleReplyChange(c.commentId, e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              _handleSubmitReply(c.commentId);
                            }
                          }}
                          disabled={isPostingComment}
                        />
                        <button
                          onClick={() => _handleSubmitReply(c.commentId)}
                          disabled={
                            isPostingComment || !replyTexts[c.commentId]?.trim()
                          }
                          className="bg-gray-900 text-white text-sm px-4 py-[10px] rounded-[5px] text-caption font-semibold 
                                    hover:bg-gray-800 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {t.CommentSubmit}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* 페이지네이션 */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 0 || isCommentsPending}
                className="px-3 py-1 disabled:opacity-50 cursor-pointer"
              >
                <img src="/images/CommentsPrevButton.svg"/>
              </button>

              {(() => {
                const windowSize = 5;
                const start = Math.max(
                  0,
                  Math.min(
                    page - Math.floor(windowSize / 2),
                    totalPages - windowSize
                  )
                );
                const end = Math.min(totalPages - 1, start + windowSize - 1);
                const pages: number[] = [];
                for (let i = start; i <= end; i++) pages.push(i);

                return pages.map((p) => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    disabled={isCommentsPending}
                    className={`px-3 py-1 rounded cursor-pointer ${
                      p === page ? "bg-gray-200 text-black" : "hover:bg-gray-50"
                    }`}
                  >
                    {p + 1}
                  </button>
                ));
              })()}

              <button
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages - 1 || isCommentsPending}
                className="px-3 py-1 disabled:opacity-50 cursor-pointer"
              >
                <img src="/images/CommentsNextButton.svg"/>
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
