import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";
import type {
  postLoginRequestDTO,
  postLoginResponseDTO,
} from "../../utils/types/auth";
import { setLocalStorageItem } from "../../apis/axios";

export const useSignin = () => {
  const queryClient = useQueryClient();

  return useMutation<postLoginResponseDTO, Error, postLoginRequestDTO>({
    mutationFn: postSignin,
    onSuccess: (data) => {
      // 1️⃣ Store tokens in localStorage
      setLocalStorageItem("accessToken", data.result.accessToken);
      setLocalStorageItem("refreshToken", data.result.refreshToken);

      // 2️⃣ Store user info in query cache
      queryClient.setQueryData(["myInfo"], data.result.member);
      // (Optional) If you have other dependent queries, you can invalidate them
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
      window.location.href = "/";
    },
  });
};
