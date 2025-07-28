// hooks/useWritingSubmit.ts
import { useState, useCallback } from "react";
import type {
  DiaryUploadRequestDTO,
  DiaryUploadResponseDTO,
} from "../utils/types/diary";
import { postDiaryUpload } from "../apis/diary";

function useWritingSubmit({
  title,
  content,
  style,
  visibility,
  commentPermission,
  language,
  thumbImg,
}: DiaryUploadRequestDTO) {
  const [data, setData] = useState<DiaryUploadResponseDTO | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  const submitWriting = useCallback(async () => {
    try {
      const response = await postDiaryUpload({
        title,
        content,
        style,
        visibility,
        commentPermission,
        language,
        thumbImg,
      });
      setData(response);
    } catch (e) {
      console.error("Error submitting writing:", e);
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  }, [
    title,
    content,
    style,
    visibility,
    commentPermission,
    language,
    thumbImg,
  ]);

  return { data, isPending, isError, submitWriting };
}

export default useWritingSubmit;
