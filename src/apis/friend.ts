import type {
  FriendRequesterId,
  FriendAcceptResponseDTO,
  FriendRefuseResponseDTO,
  FriendRequestResponseDTO,
  FriendCancelResponseDTO,
  FriendDeleteResponseDTO,
  FriendListResponseDTO,
  FriendRequestListResponseDTO,
} from "../utils/types/friend";
import { axiosInstance } from "./axios";

// 친구 요청 보내기
export const postFriendRequest = async (
  body: { receiverId: number }
): Promise<FriendRequestResponseDTO> => {
  const { data } = await axiosInstance.post<FriendRequestResponseDTO>(
    "friends/request",
    body
  );
  return data;
};

// 친구 요청 수락
export const postFriendAccept = async (
  requesterId: FriendRequesterId
): Promise<FriendAcceptResponseDTO> => {
  try {
    const { data } = await axiosInstance.post<FriendAcceptResponseDTO>(
      "friends/accept",
      requesterId
    );
    return data;
  } catch (error) {
    console.error("Error accepting friend request:", error);
    throw error;
  }
};

// 친구 요청 거절
export const postFriendRefuse = async (
  requesterId: FriendRequesterId
): Promise<FriendRefuseResponseDTO> => {
  try {
    const { data } = await axiosInstance.post<FriendRefuseResponseDTO>(
      "friends/refuse",
      requesterId
    );
    return data;
  } catch (error) {
    console.error("Error refusing friend request:", error);
    throw error;
  }
};

// 친구 요청 취소
export const patchFriendCancel = async (
  body: { receiverId: number }
): Promise<FriendCancelResponseDTO> => {
  const { data } = await axiosInstance.patch<FriendCancelResponseDTO>(
    "friends/cancel",
    body
  );
  return data;
};

// 친구 목록 조회
export const getFriends = async (): Promise<FriendListResponseDTO> => {
  const { data } = await axiosInstance.get<FriendListResponseDTO>("friends");
  return data;
};

// 친구 요청 목록 조회
export const getFriendRequests = async (): Promise<FriendRequestListResponseDTO> => {
  const { data } = await axiosInstance.get<FriendRequestListResponseDTO>(
    "friends/requests"
  );
  return data;
};

// 친구 삭제
export const deleteFriend = async (
  friendId: number
): Promise<FriendDeleteResponseDTO> => {
  const { data } = await axiosInstance.delete<FriendDeleteResponseDTO>(
    `friends/${friendId}`
  );
  return data;
};
