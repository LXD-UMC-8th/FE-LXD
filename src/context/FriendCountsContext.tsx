import { createContext, useContext } from "react";

type Ctx = {
  friendCount: number;
  requestsCount: number;
  setFriendCount: (n: number | ((p: number) => number)) => void;
  setRequestsCount: (n: number | ((p: number) => number)) => void;

  // 편의 증감 함수
  incFriend: (delta?: number) => void;
  decFriend: (delta?: number) => void;
  incRequests: (delta?: number) => void;
  decRequests: (delta?: number) => void;
};

const FriendCountsContext = createContext<Ctx | null>(null);
export const useFriendCounts = () => {
  const v = useContext(FriendCountsContext);
  if (!v) throw new Error("useFriendCounts must be used within FriendCountsProvider");
  return v;
};

type ProviderProps = {
  value: Omit<Ctx, "incFriend" | "decFriend" | "incRequests" | "decRequests">;
  children: React.ReactNode;
};

export function FriendCountsProvider({ value, children }: ProviderProps) {
  const { friendCount, requestsCount, setFriendCount, setRequestsCount } = value;
  const incFriend = (d = 1) => setFriendCount((p) => p + d);
  const decFriend = (d = 1) => setFriendCount((p) => Math.max(0, p - d));
  const incRequests = (d = 1) => setRequestsCount((p) => p + d);
  const decRequests = (d = 1) => setRequestsCount((p) => Math.max(0, p - d));
  return (
    <FriendCountsContext.Provider
      value={{
        friendCount,
        requestsCount,
        setFriendCount,
        setRequestsCount,
        incFriend,
        decFriend,
        incRequests,
        decRequests,
      }}
    >
      {children}
    </FriendCountsContext.Provider>
  );
}
