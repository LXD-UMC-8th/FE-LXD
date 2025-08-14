import type { SavedCorrectionsResponseDTO } from "../utils/types/savedCorrection";
import { axiosInstance } from "./axios";

// ⬇️ 목록 조회
export const getSavedCorrections = async (
  pageParam: number,
  size = 10
): Promise<SavedCorrectionsResponseDTO> => {
  const { data } = await axiosInstance.get<SavedCorrectionsResponseDTO>(
    "/corrections/saved",
    {
      params: { page: pageParam, size },
    }
  );
  return data;
};
// ⬇️ 메모 생성
export const postSavedMemo = async (params: {
  savedCorrectionId: number;
  memo: string;
}) => {
  const { data } = await axiosInstance.post("/corrections/saved/memo", params);
  return data;
};

// ⬇️ 메모 수정
export const patchSavedMemo = async (params: {
  savedCorrectionId: number;
  memo: string;
}) => {
  const { data } = await axiosInstance.patch("/corrections/saved/memo", params);
  return data;
};

// ⬇️ 메모 삭제
export const deleteSavedMemo = async (savedCorrectionId: number) => {
  const { data } = await axiosInstance.delete(
    `/corrections/saved/${savedCorrectionId}/memo`
  );
  return data;
};
