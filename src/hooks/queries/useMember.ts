import { useQuery } from "@tanstack/react-query";
import { getMemberLanguage } from "../../apis/members";
import type { MemberLanguageResponseDTO } from "../../utils/types/member";

export const useMemberLanguage = () => {
  return useQuery<MemberLanguageResponseDTO>({
    queryKey: ["memberLanguage"],
    queryFn: async () => {
      const data = await getMemberLanguage();
      if (data === undefined) {
        throw new Error("Failed to fetch member language");
      }
      return data;
    },
  });
};
