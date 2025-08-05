import { useMutation } from "@tanstack/react-query";
import type { readAllNotificationResponseDTO } from "../../utils/types/notification";
import { patchReadAllNotifications } from "../../apis/notification";
import { useNavigate } from "react-router-dom";

export function useNotificationReadAll() {
  const navigate = useNavigate();
  return useMutation<readAllNotificationResponseDTO, void>({
    mutationKey: ["notificationReadAll"],
    mutationFn: () => patchReadAllNotifications(),
    onSuccess: (data) => {
      console.log("All notifications marked as read:", data);
    },
    onError: (error) => {
      console.log(error);
      navigate("/error");
    },
  });
}
