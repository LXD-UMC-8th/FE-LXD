// axios.ts
import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postReissue } from "./auth";
import {
  initActivityListeners,
  wasRecentlyActive,
} from "../context/ActiveTracker";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const axiosInstance = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, ""),
});

// Utility functions to access localStorage directly
export const getLocalStorageItem = (key: string): string | null => {
  const raw = localStorage.getItem(key);
  //raw -> parse JSON string to object
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return raw;
  }
};

export const setLocalStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorageItem = (key: string) => {
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
      !originalRequest._retry &&
      window.location.pathname !== "/home"
    ) {
      removeLocalStorageItem(LOCAL_STORAGE_KEY.accessToken);
      removeLocalStorageItem(LOCAL_STORAGE_KEY.refreshToken);
      window.location.href = "/home";
      return Promise.reject(error);
    }
  }
);

initActivityListeners();

setInterval(() => {
  const isActive = wasRecentlyActive();

  if (isActive) {
    try {
      const refreshToken = getLocalStorageItem(LOCAL_STORAGE_KEY.refreshToken);
      if (refreshToken) {
        postReissue(refreshToken)
          .then((res) => {
            if (res?.result?.accessToken) {
              setLocalStorageItem(
                LOCAL_STORAGE_KEY.accessToken,
                res.result.accessToken
              );
              setLocalStorageItem(
                LOCAL_STORAGE_KEY.refreshToken,
                res.result.refreshToken
              );
            }
          })
          .catch((err) => {
            console.error("❌ Token refresh failed:", err);
            removeLocalStorageItem(LOCAL_STORAGE_KEY.accessToken);
            removeLocalStorageItem(LOCAL_STORAGE_KEY.refreshToken);
            window.location.href = "/home";
          });
      } else {
        removeLocalStorageItem(LOCAL_STORAGE_KEY.accessToken);
        removeLocalStorageItem(LOCAL_STORAGE_KEY.refreshToken);
        window.location.href = "/home";
      }
    } catch (error) {
      console.error("❌ Error during scheduled token refresh:", error);
    }
  } else {
    console.log("⏳ Skipped token refresh — user inactive");
  }
}, 50 * 60 * 1000);
