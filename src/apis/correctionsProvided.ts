// src/apis/correctionsProvided.ts
import type { ProvidedCorrectionsResponseDTO } from "../utils/types/savedCorrection";
import { axiosInstance } from "./axios";

// 1부터 시작 (스웨거 예시 기준)
export const getProvidedCorrections = async (
  pageParam: number,
  size = 10
): Promise<ProvidedCorrectionsResponseDTO> => {
  const response = await axiosInstance.get<ProvidedCorrectionsResponseDTO>(
    "/corrections/provided",
    {
      params: { page: pageParam, size },
    }
  );
  return response.data; // 서버 DTO 그대로 반환
};
