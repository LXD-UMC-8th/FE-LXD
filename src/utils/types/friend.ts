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
