import type { APIResponse } from "./APIresponse";

export type NotificationContentProps = {
  title?: string;
  id: number;
  profileImg?: string;
  messageParts: part[];
  redirectUrl?: string;
  createdAt?: string;
  read?: boolean;
  buttonField?: boolean;
};

type part = { type: string; value: string };

type getNotificationsResponseContent = {
  totalElements: number;
  content: NotificationContentProps[];
  hasNext: boolean;
  page: number;
  totalPages: number;
  size: number;
};

export type getNotificationsResponseDTO =
  APIResponse<getNotificationsResponseContent>;

export type patchRedirectNotificationRequestDTO = {
  notificationId: number;
};

export type patchReadAllNotificationResponseDTO = APIResponse<string>;

export type patchRedirectNotificationResponseDTO =
  APIResponse<redirectNotificationResultDTO>;

type redirectNotificationResultDTO = {
  notificationId: number;
  redirectUrl: string;
  read: boolean;
};
