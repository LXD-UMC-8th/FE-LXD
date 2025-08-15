import type { APIResponse } from "./APIresponse";

export type FriendRequesterId = {
  replace(arg0: string, arg1: string): unknown;
  requesterId: number;
};

export type FriendReceiverId = {
  receiverId: number;
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
  totalRequests: number;
  friends: {
    totalElements: number;
    contents: {
      memberId: number;
      username: string;
      nickname: string;
      profileImg: string;
    }[];
    page: number;
    size: number;
    hasNext: boolean;
  };
}>;

// 친구 요청 목록 조회 응답 (Swagger에 맞춰 수정)
export type FriendRequestListResponseDTO = APIResponse<{
  totalFriends: number;
  sentRequests: {
    totalElements: number;
    contents: {
      memberId: number;
      username: string;
      nickname: string;
      profileImg: string;
    }[];
    page: number;
    size: number;
    hasNext: boolean;
  };
  receivedRequests: {
    totalElements: number;
    contents: {
      memberId: number;
      username: string;
      nickname: string;
      profileImg: string;
    }[];
    page: number;
    size: number;
    hasNext: boolean;
  };
}>;

// 친구 검색 응답 DTO
export type FriendSearchResponseDTO = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    query: string;
    members: {
      totalElements: number;
      contents: {
        memberId: number;
        username: string;
        nickname: string;
        profileImageUrl: string;
      }[];
      page: number;
      size: number;
      hasNext: boolean;
    };
  };
};

export type Friend = {
  id: number;
  name: string;
  username: string;
  image?: string;
  isFriend: boolean;
};
