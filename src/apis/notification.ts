// src//notifications.ts
import { axiosInstance } from "./axios";
import { EventSourcePolyfill } from "event-source-polyfill";
import type {
  patchReadAllNotificationResponseDTO,
  patchRedirectNotificationResponseDTO,
} from "../utils/types/notification";

const API = import.meta.env.VITE_API_BASE_URL;

export async function getNotifications(pageParam: number) {
  console.log("fetchNotifications called");
  const res = await axiosInstance.get("/notifications", {
    params: {
      page: pageParam,
      size: 4,
    },
  });
  console.log("fetchNotifications response:", res.data);
  return res.data;
}

export function getSubscribeToNotifications() {
  const token = localStorage.getItem("accessToken");
  const es = new EventSourcePolyfill(`${API}/notifications/subscribe`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "text/event-stream",
      Accept: "text/event-stream",
    },
  });

  console.log(es);

  return es;
}

export async function patchReadAllNotifications(
  totalElements: number
): Promise<patchReadAllNotificationResponseDTO> {
  try {
    console.log(
      "patchReadAllNotifications called with totalElements:",
      totalElements
    );
    const { data } =
      await axiosInstance.patch<patchReadAllNotificationResponseDTO>(
        "/notifications/read-all",
        {
          params: {
            page: 1,
            size: totalElements,
          },
        }
      );

    return data;
  } catch (error) {
    console.error("Error reading all /notifications:", error);
    throw error;
  }
}

export async function patchRedirectNotification({
  notificationId,
}: {
  notificationId: number;
}): Promise<patchRedirectNotificationResponseDTO> {
  try {
    const { data } = await axiosInstance.patch(
      `/notifications/${notificationId}/read-redirect`
    );

    return data;
  } catch (error) {
    console.log("Error redirectNotification", error);
    throw error;
  }
}
