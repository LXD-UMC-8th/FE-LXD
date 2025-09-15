import { createContext, useContext, useEffect, useState } from "react";
import { getMemberProfile } from "../apis/members";

interface User {
  memberId: number;
  username: string;
  email: string;
  nickname: string;
  profileImg: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getMemberProfile().then((res) => {
        if (res?.result) {
          setUser(res.result); // result 안에 유저 정보가 있음
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
