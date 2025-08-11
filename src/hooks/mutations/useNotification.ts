import { useMutation, type InfiniteData } from "@tanstack/react-query";
import type {
  getNotificationsResponseDTO,
  patchReadAllNotificationResponseDTO,
} from "../../utils/types/notification";
import { patchReadAllNotifications } from "../../apis/notification";
import { patchRedirectNotification } from "../../apis/notification";
import type { redirectNotificationResultDTO } from "../../utils/types/notification";
import { queryClient } from "../../App.tsx";

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
  mutateFn: () => Promise<void>
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

export const useNotifications = () => {
  return useMutation({
    mutationKey: ["notification"],
    mutationFn: ({ notificationId }: { notificationId: number }) =>
      patchRedirectNotification({ notificationId }),

    onMutate: async ({ notificationId }) => {
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: ["notifications"],
          exact: false,
        }),
        queryClient.cancelQueries({
          queryKey: ["notification", notificationId],
        }),
      ]);

      const previousSingle =
        queryClient.getQueryData<redirectNotificationResultDTO>([
          "notification",
          notificationId,
        ]);

      const previousList = queryClient.getQueryData<
        InfiniteData<getNotificationsResponseDTO>
      >(["notifications"]);

      queryClient.setQueryData(
        ["notification", notificationId],
        (old: redirectNotificationResultDTO | undefined) => ({
          ...(old ?? {}),
          read: true,
        })
      );

      if (previousList?.pages) {
        queryClient.setQueryData(["notifications"], {
          ...previousList,
          pages: previousList.pages.map((page) => ({
            ...page,
            result: {
              ...page.result,
              contents: page.result.contents.map((n) =>
                n.id === notificationId ? { ...n, read: true } : n
              ),
            },
          })),
        } as InfiniteData<getNotificationsResponseDTO>);
      }

      return { previousSingle, previousList, notificationId };
    },

    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      queryClient.setQueryData(
        ["notification", ctx.notificationId],
        ctx.previousSingle
      );
      queryClient.setQueryData(["notifications"], ctx.previousList);
    },

    onSettled: async (_data, _error, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["notification", variables.notificationId],
        }),
        queryClient.invalidateQueries({ queryKey: ["notifications"] }),
      ]);
    },
  });
};
