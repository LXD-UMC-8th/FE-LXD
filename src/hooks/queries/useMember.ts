import { useQuery } from "@tanstack/react-query";
import { getMemberLanguage } from "../../apis/members";
import type { MemberLanguageResponseDTO } from "../../utils/types/member";
import { QUERY_KEY } from "../../constants/key";

export const useMemberLanguage = () => {
  return useQuery<MemberLanguageResponseDTO>({
    queryKey: [QUERY_KEY.memberLanguage],
    queryFn: async () => {
      const data = await getMemberLanguage();
      if (data === undefined) {
        throw new Error("Failed to fetch member language");
      }
      return data;
    },
  });
};
