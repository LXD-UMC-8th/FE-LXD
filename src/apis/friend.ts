import type {
  FriendReceiverId,
  FriendAcceptResponseDTO,
  FriendRefuseResponseDTO,
  FriendRequestResponseDTO,
  FriendCancelResponseDTO,
  FriendDeleteResponseDTO,
  FriendListResponseDTO,
  FriendRequestListResponseDTO,
  FriendSearchResponseDTO,
} from "../utils/types/friend";
import { axiosInstance } from "./axios";

// 친구 요청 보내기
export const postFriendRequest = async (
  body: FriendReceiverId
): Promise<FriendRequestResponseDTO> => {
  const { data } = await axiosInstance.post<FriendRequestResponseDTO>(
    "/friends/request",
    body
  );
  return data;
};

// 친구 요청 수락
export const postFriendAccept = async (
  requesterId: number
): Promise<FriendAcceptResponseDTO | undefined> => {
  //requesterId가 없고 /member/{number}로 된 형태를 보완하기 위해 코드 조정
  try {
    const { data } = await axiosInstance.post<FriendAcceptResponseDTO>(
      "/friends/accept",
      { requesterId: requesterId }
    );

    return data;
  } catch (error) {
    console.error("Error accepting friend request:", error);
  }
};

// 친구 요청 거절
export const postFriendRefuse = async (
  requesterId?: number
): Promise<FriendRefuseResponseDTO | undefined> => {
  try {
    const { data } = await axiosInstance.post<FriendRefuseResponseDTO>(
      "/friends/refuse",
      { requesterId: requesterId }
    );

    return data;
  } catch (error) {
    console.error("Error refusing friend request:", error);
  }
};

// 친구 요청 취소
export const patchFriendCancel = async (
  body: FriendReceiverId
): Promise<FriendCancelResponseDTO> => {
  const { data } = await axiosInstance.patch<FriendCancelResponseDTO>(
    "/friends/cancel",
    body
  );
  return data;
};

// 친구 목록 조회 (페이지네이션 지원)
export const getFriends = async (
  page = 1,
  size = 10
): Promise<FriendListResponseDTO> => {
  const { data } = await axiosInstance.get<FriendListResponseDTO>(`/friends`, {
    params: { page, size },
  });
  return data;
};

// 친구 요청 목록 조회
export const getFriendRequests =
  async (): Promise<FriendRequestListResponseDTO> => {
    const { data } = await axiosInstance.get<FriendRequestListResponseDTO>(
      "/friends/requests"
    );
    return data;
  };

// 친구 삭제
export const deleteFriend = async (
  friendId: number
): Promise<FriendDeleteResponseDTO> => {
  const { data } = await axiosInstance.delete<FriendDeleteResponseDTO>(
    `/friends/${friendId}`
  );
  return data;
};

// 친구 검색 API
export const searchFriends = async (
  query: string,
  page = 1,
  size = 10
): Promise<FriendSearchResponseDTO> => {
  const { data } = await axiosInstance.get(`/friends/search`, {
    params: { query, page, size },
  });
  return data;
};
