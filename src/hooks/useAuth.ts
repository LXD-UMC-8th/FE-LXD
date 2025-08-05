export const useAuth = () => {
  const accessToken = localStorage.getItem("accessToken");
  const isLoggedIn = !!accessToken;

  return { isLoggedIn, accessToken };
};
