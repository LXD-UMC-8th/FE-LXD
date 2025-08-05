import { subscribeToNotifications } from "./notification";

let es: EventSource | null = null;

//data형식 정해지면 Type 안정화 시키기.
export const initSSE = (callback: (data: any) => void) => {
  if (es) return; // already initialized

  es = subscribeToNotifications(callback);
  es.onopen = () => console.log("📡 connected");
  es.onerror = (err) => console.error("❗error:", err);

  setInterval(
    () => {
      if (es) es.close();
      es = subscribeToNotifications(callback);
    },
    50 * 60 * 1000,
  );
};
