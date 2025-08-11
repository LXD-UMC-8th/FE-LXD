import { axiosInstance } from "./axios";

// ⬇️ 목록 조회
export const getSavedCorrections = async (page = 0, size = 10) => {
  const { data } = await axiosInstance.get("/corrections/saved", {
    params: { page, size },
  });
  return data;
};
// ⬇️ 메모 생성
export const postSavedMemo = async (params: { savedCorrectionId: number; memo: string }) => {
  const { data } = await axiosInstance.post("/corrections/saved/memo", params);
  return data;
};

// ⬇️ 메모 수정
export const patchSavedMemo = async (params: { savedCorrectionId: number; memo: string }) => {
  const { data } = await axiosInstance.patch("/corrections/saved/memo", params);
  return data;
};

// ⬇️ 메모 삭제
export const deleteSavedMemo = async (savedCorrectionId: number) => {
  const { data } = await axiosInstance.delete(
    `/corrections/saved/${savedCorrectionId}/memo`,
  );
  return data;
};
