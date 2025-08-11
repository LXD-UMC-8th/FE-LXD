import { QueryCache, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postSignin,
  type LoginRequest,
  type LoginResponse,
} from "../../apis/auth";

export const useSignin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: postSignin,
    onSuccess: (data) => {
      // 1️⃣ Store tokens in localStorage
      localStorage.setItem("accessToken", data.result.accessToken);
      localStorage.setItem("refreshToken", data.result.refreshToken);

      // 2️⃣ Store user info in query cache
      queryClient.setQueryData(["myInfo"], data.result.member);
      // (Optional) If you have other dependent queries, you can invalidate them
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
  });
};
