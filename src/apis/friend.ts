import type {
  FriendRequesterId,
  FriendAcceptResponseDTO,
  FriendRefuseResponseDTO,
} from "../utils/types/friend";
import { axiosInstance } from "./axios";

export const postFriendAccept = async (
  requesterId: FriendRequesterId,
): Promise<FriendAcceptResponseDTO> => {
  try {
    const { data } = await axiosInstance.post<FriendAcceptResponseDTO>(
      "friends/accept",
      requesterId,
    );
    return data;
  } catch (error) {
    console.error("Error accepting friend request:", error);
    throw error;
  }
};

export const postFriendRefuse = async (
  requesterId: FriendRequesterId,
): Promise<FriendRefuseResponseDTO> => {
  try {
    const { data } = await axiosInstance.post<FriendRefuseResponseDTO>(
      "friends/refuse",
      requesterId,
    );
    return data;
  } catch (error) {
    console.error("Error refusing friend request:", error);
    throw error;
  }
};
