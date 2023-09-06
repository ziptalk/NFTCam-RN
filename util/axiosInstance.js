import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./http";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (error.response?.status === 401) {
      async function reissue() {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        const response = await axios.put(BASE_URL + "/auth/reissue", {
          refreshToken: refreshToken,
        });
        AsyncStorage.setItem("accessToken", response.data.accessToken);
        AsyncStorage.setItem("refreshToken", response.data.refreshToken);

        return response.data.accessToken;
      }

      const accessToken = reissue();

      error.config.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      // 중단된 요청을(에러난 요청)을 토큰 갱신 후 재요청
      const response = await axios.request(error.config);
      return response;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
