import { useMutation } from "@tanstack/react-query";
import { patchMemberLanguage } from "../../apis/members";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";

export const usePatchLanguage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (language: string) => {
      return patchMemberLanguage(language);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });

      // window.location.reload();
    },
  });
};
