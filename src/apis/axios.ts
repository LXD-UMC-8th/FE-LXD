// axios.ts
import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postReissue } from "./auth";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const axiosInstance = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, ""),
});

let refreshPromise: Promise<string | null> | null = null;

// Utility functions to access localStorage directly
const getLocalStorageItem = (key: string): string | null => {
  const raw = localStorage.getItem(key);
  //raw -> parse JSON string to object
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return raw;
  }
};

const setLocalStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};

// Request interceptor
//axiosInstance의 request을 가로채어 accessToken을 헤더에 추가함.
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getLocalStorageItem(LOCAL_STORAGE_KEY.accessToken);
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
//axiosInstance의 response를 가로채어 401 에러 발생 시 refresh 토큰을 이용해 accessToken을 재발급함.
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.code === "AUTH4301" &&
      !originalRequest._retry
    ) {
      //여기 부분의 주소는 swagger문서에 따라 바뀔 예정임
      //refreshToken이 만료됙거나 유효하지 않은 경우 로그아웃을 진행하고 로그인 페이지로 리다이렉트함.
      if (originalRequest.url === "/auth/reissue") {
        removeLocalStorageItem(LOCAL_STORAGE_KEY.accessToken);
        removeLocalStorageItem(LOCAL_STORAGE_KEY.refreshToken);
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      //refreshPromise가 이미 존재하는 경우임
      if (!refreshPromise) {
        refreshPromise = (async () => {
          const refreshToken = getLocalStorageItem(
            LOCAL_STORAGE_KEY.refreshToken
          );
          if (!refreshToken) throw new Error("No refresh token");

          const reissueData = await postReissue(refreshToken);

          setLocalStorageItem(
            LOCAL_STORAGE_KEY.accessToken,
            reissueData.result.accessToken
          );
          setLocalStorageItem(
            LOCAL_STORAGE_KEY.refreshToken,
            reissueData.result.refreshToken
          );

          return reissueData.result.accessToken;
        })()
          //refreshToken이 없을 경우 토큰을 모두 지워준 후에 다시 LoginPage로 redirect함.
          .catch(() => {
            removeLocalStorageItem(LOCAL_STORAGE_KEY.accessToken);
            removeLocalStorageItem(LOCAL_STORAGE_KEY.refreshToken);
            window.location.href = "/login";
            return null;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      return refreshPromise.then((newAccessToken) => {
        if (newAccessToken) {
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
      });
    }

    return Promise.reject(error);
  }
);
