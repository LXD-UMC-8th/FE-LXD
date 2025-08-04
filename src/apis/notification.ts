// src/notifications.ts
import { axiosInstance } from "./axios";
import { EventSourcePolyfill } from "event-source-polyfill";

const API = import.meta.env.VITE_API_BASE_URL;

export async function fetchNotifications() {
  console.log("fetchNotifications called");
  const res = await axiosInstance.get(`${API}notifications`, {
    params: {
      page: 0,
      size: 5,
    },
  });
  return res.data;
}

export function subscribeToNotifications() {
  const token = localStorage.getItem("accessToken");
  const es = new EventSourcePolyfill(`${API}notifications/subscribe`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "text/event-stream",
      Accept: "text/event-stream",
    },
  });

  console.log(es);

  return es;
}
