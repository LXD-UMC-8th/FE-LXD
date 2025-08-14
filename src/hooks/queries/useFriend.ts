// import { useMutation } from "@tanstack/react-query";
// import { postFriendAccept, postFriendRefuse } from "../../apis/friend.ts";
// import { queryClient } from "../App.tsx";g
// import type { FriendRequesterId } from "../../utils/types/friend.ts";
// import { patchRedirectNotification } from "../apis/notification.ts";

// export const useAcceptFriend = ({ requesterId }: { requesterId: patchRedirectNotificationRequestDTO }) => {
//   return useMutation({
//     mutationKey: ["AcceptFriend", requesterId],
//     mutationFn: (requesterId: FriendRequesterId) =>
//       postFriendAccept(requesterId),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["Friends", requesterId]);
//     },
//   });
// };

// export const useRefuseFriend = ({ requesterId }: { requesterId: number }) => {
//   return useMutation({
//     mutationKey: ["RefuseFriend", requesterId],
//     mutationFn: (requesterId: FriendRequesterId) =>
//       postFriendRefuse(requesterId),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["Friends", requesterId]);
//     },
//   });
// };

//   return useMutation({
//     mutationFn: postFriendRefuse,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["Friends"]);
//     },
//   });
// };
