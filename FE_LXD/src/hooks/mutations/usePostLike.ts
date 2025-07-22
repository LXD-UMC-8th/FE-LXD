import { useMutation } from "@tanstack/react-query";
import { postCommentLike, postLike } from "../../apis/likes";

function usePostLike() {
    return useMutation({
        mutationFn: async(params) => {
            if (params.type === "comments") {
                return await postCommentLike(params.diaryId, params.commentId);
            } else {
                return await postLike(params.type, params.id);
            }
        },
    });
}

export default usePostLike;