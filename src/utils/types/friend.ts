import type { APIResponse } from "./APIresponse";

export type FriendRequesterId = {
  requesterId: number;
};

export type FriendAcceptResponseDTO = {
  message: string;
  isSuccess?: boolean;
  code?: string;
  result?: {
    message?: string;
  };
};

export type FriendRefuseResponseDTO = APIResponse<{ message: string }>;

// 친구 요청 응답
export type FriendRequestResponseDTO = APIResponse<{ message: string }>;

// 친구 요청 취소 응답
export type FriendCancelResponseDTO = APIResponse<{ message: string }>;

// 친구 삭제 응답
export type FriendDeleteResponseDTO = APIResponse<{ message: string }>;

// 친구 목록 조회 응답
export type FriendListResponseDTO = APIResponse<{
  totalFriends: number;
  totalRequests: number;
  friends: {
    memberId: number;
    username: string;
    nickname: string;
    profileImg: string;
  }[];
}>;

// 친구 요청 목록 조회 응답
export type FriendRequestListResponseDTO = APIResponse<{
  sentRequestsCount: number;
  receivedRequestsCount: number;
  totalFriends: number;
  sentRequests: {
    memberId: number;
    username: string;
    nickname: string;
    profileImg: string;
  }[];
  receivedRequests: {
    memberId: number;
    username: string;
    nickname: string;
    profileImg: string;
  }[];
}>;