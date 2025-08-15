import { useMutation, type InfiniteData } from "@tanstack/react-query";
import type {
  getNotificationsResponseDTO,
  patchReadAllNotificationResponseDTO,
} from "../../utils/types/notification";
import { patchReadAllNotifications } from "../../apis/notification";
import { patchRedirectNotification } from "../../apis/notification";
import type { redirectNotificationResultDTO } from "../../utils/types/notification";
import { queryClient } from "../../App.tsx";
import { QUERY_KEY } from "../../constants/key.ts";

export function useNotificationReadAll() {
  return useMutation<patchReadAllNotificationResponseDTO, void, number>({
    mutationKey: ["notificationReadAll"],
    mutationFn: async (totalElements) => {
      const res = await patchReadAllNotifications(totalElements);
      return res;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.notifications],
        exact: false,
      });

      const previousList = queryClient.getQueryData<
        InfiniteData<getNotificationsResponseDTO>
      >([QUERY_KEY.notifications]);

      // Optimistic: mark everything read + zero counters immediately
      if (previousList?.pages) {
        const next: InfiniteData<getNotificationsResponseDTO> = {
          ...previousList,
          pages: previousList.pages.map((page) => ({
            ...page,
            result: {
              ...page.result,
              contents: page.result.contents.map((n) => ({
                ...n,
                read: true,
              })),
            },
          })),
        };
        queryClient.setQueryData([QUERY_KEY.notifications], next);
      }

      queryClient.setQueryData([QUERY_KEY.notifications, QUERY_KEY.badge], 0);

      return { previousList };
    },

    onError: (_err, _vars, ctx: unknown) => {
      const context = ctx as
        | { previousList?: InfiniteData<getNotificationsResponseDTO> }
        | undefined;
      if (context?.previousList) {
        queryClient.setQueryData([QUERY_KEY.notifications], context.previousList);
      }
    },

    onSuccess: (data) => {
      // Reconcile with server (will also be 0 / read: true)
      queryClient.setQueryData(
        [QUERY_KEY.notifications, QUERY_KEY.badge],
        typeof data.result === "object" &&
          data.result !== null &&
          "totalElements" in data.result
          ? (data.result as { totalElements?: number }).totalElements ?? 0
          : 0
      );
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.notifications] });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.notifications, QUERY_KEY.badge],
      });
    },
  });
}

export function useNotificationRedirect(
  id: number,
  mutateFn: () => Promise<void>
) {
  return useMutation({
    mutationKey: [QUERY_KEY.notificationRedirect, id],
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
    mutationKey: [QUERY_KEY.notification],
    mutationFn: ({ notificationId }: { notificationId: number }) =>
      patchRedirectNotification({ notificationId }),

    onMutate: async ({ notificationId }) => {
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: [QUERY_KEY.notifications],
          exact: false,
        }),
        queryClient.cancelQueries({
          queryKey: [QUERY_KEY.notification, notificationId],
        }),
      ]);

      const previousSingle =
        queryClient.getQueryData<redirectNotificationResultDTO>([
          QUERY_KEY.notification,
          notificationId,
        ]);

      const previousList = queryClient.getQueryData<
        InfiniteData<getNotificationsResponseDTO>
      >([QUERY_KEY.notifications]);

      queryClient.setQueryData(
        [QUERY_KEY.notification, notificationId],
        (old: redirectNotificationResultDTO | undefined) => ({
          ...(old ?? {}),
          read: true,
        })
      );

      if (previousList?.pages) {
        queryClient.setQueryData([QUERY_KEY.notifications], {
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
        [QUERY_KEY.notification, ctx.notificationId],
        ctx.previousSingle
      );
      queryClient.setQueryData([QUERY_KEY.notifications], ctx.previousList);
    },

    onSettled: async (_data, _error, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.notification, variables.notificationId],
        }),
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.notifications] }),
      ]);
    },
  });
};
