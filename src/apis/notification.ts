// src/notifications.ts
import axiosInstance from "axios";
import { EventSourcePolyfill } from "event-source-polyfill";
import type { APIResponse } from "../utils/types/APIresponse";

const API = import.meta.env.VITE_API_BASE_URL;

export async function fetchNotifications() {
  const res = await axiosInstance.get(`${API}/notifications`);
  return res.data;
}

export function subscribeToNotifications<T>(
  onEvent: (payload: T) => void,
  onError?: (err: Event) => void,
): EventSource {
  const token = localStorage.getItem("accessToken");
  const es = new EventSourcePolyfill(`${API}notifications/subscribe`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    heartbeatTimeout: 300_000,
    withCredentials: true,
  });

  es.onmessage = (evt) => {
    try {
      const envelope = JSON.parse(evt.data) as APIResponse<T>;
      if (envelope.isSuccess) {
        onEvent(envelope.result);
      } else {
        console.warn(
          `SSE error code=${envelope.code} message=${envelope.message}`,
        );
      }
    } catch {
      console.warn("Invalid SSE payload", evt.data);
    }
  };

  es.onerror = (err) => {
    onError?.(err);
  };

  return es;
}
