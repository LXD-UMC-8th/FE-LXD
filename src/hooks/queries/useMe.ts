import { useQuery } from "@tanstack/react-query";
import { getMemberProfile } from "../../apis/members";


export const ME_QK = ["me"];

export const useMe = () => {
  return useQuery({
    queryKey: ME_QK,
    queryFn: async () => {
      const dto = await getMemberProfile();
      // 스웨거 기준: { isSuccess, code, message, result: { memberId, ... } }
      return dto?.result;
    },
    staleTime: 5 * 60 * 1000,
  });
};
