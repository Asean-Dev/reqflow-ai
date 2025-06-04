import type { AxiosRequestConfig } from "axios";

import axios from "axios";

import { CONFIG } from "../config-global";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.site.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!"
    )
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    // console.error("Failed to fetch:", error, (error as any)?.response);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: "/api/chat",
};
