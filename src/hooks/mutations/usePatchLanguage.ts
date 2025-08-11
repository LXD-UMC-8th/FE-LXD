import { useMutation } from "@tanstack/react-query";
import { patchMemberLanguage } from "../../apis/members";
import { useQueryClient } from "@tanstack/react-query";

export const usePatchLanguage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (language: string) => {
      return patchMemberLanguage(language);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });

      window.location.reload();
    },
  });
};
