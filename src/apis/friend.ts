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

// A) friendId로만 삭제 (DELETE /friends/{friendId})
export const deleteFriend = async (friendId: number): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete(`/friends/${friendId}`, {
      // 어떤 상태코드도 reject하지 않게 하고 코드로 판정
      validateStatus: () => true,
    });
    const s = res?.status;
    return s === 200 || s === 204 || s === 404; // 404 = 이미 삭제됨
  } catch (err: any) {
    const s = err?.response?.status;
    if (s != null) return s === 200 || s === 204 || s === 404;
    console.error("deleteFriend error:", err);
    return false;
  }
};

// B) 스마트 삭제: friendId 없으면 호출하지 않음(= false)
export const deleteFriendSmart = async (p: {
  friendId?: number;
  memberId: number; // 형식만 유지, 실제 호출엔 사용 안 함
}): Promise<boolean> => {
  if (typeof p.friendId === "number") {
    return deleteFriend(p.friendId);
  }
  // 서버가 memberId 삭제를 지원하지 않음 → 실패 처리
  return false;
};
