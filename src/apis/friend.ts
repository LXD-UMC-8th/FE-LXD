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

/* ============ 친구요청 관련 ============ */

// 409(이미 요청됨)도 성공처럼 처리해 콘솔 에러 안 뜨게
export const postFriendRequest = async (
  body: FriendReceiverId
): Promise<FriendRequestResponseDTO | undefined> => {
  const res = await axiosInstance.post<FriendRequestResponseDTO>(
    "/friends/request",
    body,
    { validateStatus: (s) => (s >= 200 && s < 300) || s === 409 }
  );
  return res?.data;
};

export const postFriendAccept = async (
  requesterId: number
): Promise<FriendAcceptResponseDTO | undefined> => {
  try {
    const res = await axiosInstance.post<FriendAcceptResponseDTO>(
      "/friends/accept",
      { requesterId }
    );
    return res?.data;
  } catch (error) {
    console.error("Error accepting friend request:", error);
  }
};

export const patchFriendRefuse = async (
  requesterId?: number
): Promise<FriendRefuseResponseDTO | undefined> => {
  try {
    const res = await axiosInstance.patch<FriendRefuseResponseDTO>(
      "/friends/refuse",
      { requesterId }
    );
    return res?.data;
  } catch (error) {
    console.error("Error refusing friend request:", error);
  }
};

export const patchFriendCancel = async (
  body: FriendReceiverId
): Promise<FriendCancelResponseDTO | undefined> => {
  const res = await axiosInstance.patch<FriendCancelResponseDTO>(
    "/friends/cancel",
    body
  );
  return res?.data;
};

/* ============ 목록/검색 ============ */

export const getFriends = async (
  page = 1,
  size = 10
): Promise<FriendListResponseDTO> => {
  const res = await axiosInstance.get<FriendListResponseDTO>("/friends", {
    params: { page, size },
  });
  return res.data;
};

export const getFriendRequests = async (): Promise<FriendRequestListResponseDTO> => {
  const res = await axiosInstance.get<FriendRequestListResponseDTO>("/friends/requests");
  return res.data;
};

export const searchFriends = async (
  query: string,
  page = 1,
  size = 10
): Promise<FriendSearchResponseDTO> => {
  const res = await axiosInstance.get<FriendSearchResponseDTO>("/friends/search", {
    params: { query, page, size },
  });
  return res.data;
};

/* ============ 삭제 ============ */
// src/apis/friend.ts
// src/apis/friend.ts
export const deleteFriend = async (friendId: number) => {
  const res = await axiosInstance.delete(`/friends/${friendId}`, {
    validateStatus: () => true,
  });
  // 스웨거 기준: 200만 성공
  const ok = res.status === 200;
  if (!ok) {
    console.error("❌ deleteFriend failed", { status: res.status, data: res.data, friendId });
  } else {
    console.log("✅ deleteFriend ok", { status: res.status, data: res.data, friendId });
  }
  return { ok, status: res.status, data: res.data };
};

// (캐시 회피용) 목록 조회 헬퍼: no-cache 헤더 + 더미 파라미터
export const getFriendsNoCache = async (page = 1, size = 10) => {
  const res = await axiosInstance.get("/friends", {
    params: { page, size, _: Date.now() },               // cache-bust
    headers: { "Cache-Control": "no-cache" },            // 프록시/브라우저 캐시 회피
    validateStatus: () => true,
  });
  return res.data;
};

// 최근 친구 검색 기록 조회
export const getRecentFriendSearches = async (limit = 10) => {
  // API 명세에 응답 타입이 명확하지 않아 any로 처리했습니다. 실제 DTO로 교체해주세요.
  const res = await axiosInstance.get<any>("/friends/search/recent", {
    params: { limit },
  });
  return res.data;
};

// 최근 검색 기록 개별 삭제 (username 기반)
export const deleteRecentSearch = async (username: string) => {
  const res = await axiosInstance.delete("/friends/search/recent", {
    params: { query: username },
  });
  return res.data;
};

// 최근 검색 기록 전체 삭제
export const clearAllRecentSearches = async () => {
  const res = await axiosInstance.delete("/friends/search/recent/all");
  return res.data;
};