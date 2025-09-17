// src/apis/friend.ts

import type {
  FriendReceiverId,
  FriendAcceptResponseDTO,
  FriendRefuseResponseDTO,
  FriendRequestResponseDTO,
  FriendCancelResponseDTO,
  FriendListResponseDTO,
  FriendRequestListResponseDTO,
  FriendSearchResponseDTO,
} from "../utils/types/friend";
import { axiosInstance } from "./axios";

// ✅ [추가] 최근 검색 기록 응답 DTO (string 배열)
export type RecentSearchesResponseDTO = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string[];
};


/* ============ 친구 관계 및 요청 ============ */

// 친구 요청 보내기
export const postFriendRequest = async (body: FriendReceiverId): Promise<FriendRequestResponseDTO | undefined> => {
  const res = await axiosInstance.post<FriendRequestResponseDTO>("/friends/request", body, {
    validateStatus: (s) => (s >= 200 && s < 300) || s === 409,
  });
  return res?.data;
};
// 친구 요청 수락
export const postFriendAccept = async (requesterId: number): Promise<FriendAcceptResponseDTO | undefined> => {
  const res = await axiosInstance.post<FriendAcceptResponseDTO>("/friends/accept", { requesterId });
  return res?.data;
};
// 친구 요청 거절
export const patchFriendRefuse = async (requesterId: number): Promise<FriendRefuseResponseDTO | undefined> => {
  const res = await axiosInstance.patch<FriendRefuseResponseDTO>("/friends/refuse", { requesterId });
  return res?.data;
};
// 보낸 친구 요청 취소
export const patchFriendCancel = async (body: FriendReceiverId): Promise<FriendCancelResponseDTO | undefined> => {
  const res = await axiosInstance.patch<FriendCancelResponseDTO>("/friends/cancel", body);
  return res?.data;
};
// 친구 삭제
export const deleteFriend = async (friendId: number) => {
  const res = await axiosInstance.delete(`/friends/${friendId}`, { validateStatus: () => true });
  const ok = res.status === 200;
  return { ok, status: res.status, data: res.data };
};


/* ============ 목록 조회 및 검색 ============ */

// 친구 목록 조회
export const getFriends = async (page = 1, size = 10): Promise<FriendListResponseDTO> => {
  const res = await axiosInstance.get<FriendListResponseDTO>("/friends", { params: { page, size } });
  return res.data;
};
// 친구 요청 목록 조회
export const getFriendRequests = async (): Promise<FriendRequestListResponseDTO> => {
  const res = await axiosInstance.get<FriendRequestListResponseDTO>("/friends/requests");
  return res.data;
};
// 유저 검색 (검색 시 자동으로 최근 검색에 저장됨)
export const searchFriends = async (query: string, page = 1, size = 10): Promise<FriendSearchResponseDTO> => {
  const res = await axiosInstance.get<FriendSearchResponseDTO>("/friends/search", {
    params: { query, page, size },
  });
  return res.data;
};


/* ============ 최근 검색 기록 ============ */

// 최근 검색 기록 조회 (반환 타입 수정)
export const getRecentFriendSearches = async (limit = 10): Promise<RecentSearchesResponseDTO> => {
  const res = await axiosInstance.get<RecentSearchesResponseDTO>("/friends/search/recent", { params: { limit } });
  return res.data;
};
// 최근 검색 기록 개별 삭제
export const deleteRecentSearch = async (username: string) => {
  const res = await axiosInstance.delete("/friends/search/recent", { params: { query: username } });
  return res.data;
};
// 최근 검색 기록 전체 삭제
export const clearAllRecentSearches = async () => {
  const res = await axiosInstance.delete("/friends/search/recent-all");
  return res.data;
};