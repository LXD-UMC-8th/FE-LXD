// src/apis/correctionsProvided.ts

import type { ProvidedCorrectionsResponseDTO } from "../utils/types/savedCorrection";
import { axiosInstance } from "./axios";

/**
 * ✅ [수정] API 함수는 데이터를 가공하지 않고, 그대로 가져와서 반환하는 역할만 수행합니다.
 * 이 파일 안에 있던 불필요하고 잘못된 데이터 정규화 로직을 모두 제거하여 문제의 근본 원인을 해결합니다.
 */
export const getProvidedCorrections = async (
  pageParam: number,
  size = 10
): Promise<ProvidedCorrectionsResponseDTO> => {
  const { data } = await axiosInstance.get<ProvidedCorrectionsResponseDTO>(
    "/corrections/provided",
    {
      params: { page: pageParam, size },
    }
  );
  return data;
};