import { useMutation } from "@tanstack/react-query";
import type { readAllNotificationResponseDTO } from "../../utils/types/notification";
import { patchReadAllNotifications } from "../../apis/notification";

export function useNotificationReadAll() {
  return useMutation<readAllNotificationResponseDTO, void>({
    mutationKey: ["notificationReadAll"],
    mutationFn: () => patchReadAllNotifications(),
    onSuccess: (data) => {
      console.log("All notifications marked as read:", data);
    },
    onError: (error) => {
      console.log("error during patchReadAllNotifications", error);
    },
  });
}
