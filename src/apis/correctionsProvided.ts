import { axiosInstance } from "./axios";

// 1부터 시작 (스웨거 예시 기준)
export const getProvidedCorrections = async (page = 1, size = 10) => {
  const { data } = await axiosInstance.get("/corrections/provided", {
    params: { page, size },
  });
  return data; // 서버 DTO 그대로 반환
};
