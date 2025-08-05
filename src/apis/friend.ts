import { axiosInstance } from "./axios";

// 친구 요청 보내기
export const sendFriendRequest = async (receiverId: number) => {
  const res = await axiosInstance.post("/friends/request", { receiverId });
  return res.data;
};

// 친구 요청 수락
export const acceptFriendRequest = async (requestId: number) => {
  const res = await axiosInstance.post("/friends/accept", { requestId });
  return res.data;
};

// 친구 요청 거절
export const refuseFriendRequest = async (requestId: number) => {
  const res = await axiosInstance.patch("/friends/refuse", { requestId });
  return res.data;
};

// 친구 요청 취소
export const cancelFriendRequest = async (requestId: number) => {
  const res = await axiosInstance.patch("/friends/cancel", { requestId });
  return res.data;
};

// 친구 목록 조회
export const getFriends = async () => {
  const res = await axiosInstance.get("/friends");
  return res.data;
};

// 친구 요청 목록 조회
export const getFriendRequests = async () => {
  const res = await axiosInstance.get("/friends/requests");
  return res.data;
};

// 친구 삭제
export const deleteFriend = async (friendId: number) => {
  const res = await axiosInstance.delete(`/friends/${friendId}`);
  return res.data;
};
