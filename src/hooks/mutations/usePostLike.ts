// import { useMutation } from "@tanstack/react-query";
// import type { LikeResponseDto, LikeTargetType } from "../../utils/types/likes";
// import { postLike } from "../../apis/likes";

// interface Params {
//     targetType: LikeTargetType;
//     targetId: number;
// }

// export const usePostLike = () => 
//     useMutation<LikeResponseDto, Error, Params>({
//         mutationFn: ({ targetType, targetId }) => postLike(targetType, targetId),
//         onSuccess: (data) => {
//             console.log("좋아요 완료", data);
//         },
//         onError: (err) => {
//             console.error("좋아요 실패", err.message);
//         },
//     });