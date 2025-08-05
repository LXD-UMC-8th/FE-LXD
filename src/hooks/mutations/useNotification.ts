import { useMutation } from "@tanstack/react-query";
import type { patchReadAllNotificationResponseDTO } from "../../utils/types/notification";
import { patchReadAllNotifications } from "../../apis/notification";
import { patchRedirectNotification } from "../../apis/notification";

export function useNotificationReadAll() {
  return useMutation<patchReadAllNotificationResponseDTO, void, number>({
    mutationKey: ["notificationReadAll"],
    mutationFn: async (totalElements) => {
      console.log("patchReadAllNotifications called", totalElements);
      const res = await patchReadAllNotifications(totalElements);
      return res;
    },
    onSuccess: (data) => {
      console.log("All notifications marked as read:", data);
    },
    onError: (error) => {
      console.log("error during patchReadAllNotifications", error);
    },
  });
}

export function useNotificationRedirect(
  id: number,
  mutateFn: () => Promise<void>,
) {
  return useMutation({
    mutationKey: ["notificationRedirect", id],
    mutationFn: mutateFn,
    onSuccess: (data) => {
      console.log("Notification redirected successfully:", data);
      patchRedirectNotification({ notificationId: id });
    },
    onError: (error) => {
      console.error("Error redirecting notification:", error);
    },
  });
}
