import axios from "axios";
import { authApi } from "./auth";

function getLocalAccessToken() {
  const accessToken = JSON.parse(
    localStorage.getItem("skinFoodShopUser")
  )?.accessToken;
  return accessToken;
}

function getLocalRefreshToken() {
  const refreshToken = JSON.parse(
    localStorage.getItem("skinFoodShopUser")
  )?.refreshToken;
  return refreshToken;
}

const BASE_URL = import.meta.env.VITE_APP_API_URL;

function setAccessToken(newAccessToken) {
  const user = JSON.parse(localStorage.getItem("skinFoodShopUser"));
  user.accessToken = newAccessToken;
  localStorage.setItem("skinFoodShopUser", JSON.stringify(user));
}

const axiosClient = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 20000,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = getLocalAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error) {
    const originalRequest = error.config;

    // If the error status is 401 and the request was unauthorized
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await authApi.getAccessToken(
          getLocalRefreshToken()
        ); // Refresh the token
        setAccessToken(newAccessToken); // Set the new access token in the header

        // Retry the original request with the new token
        originalRequest.headers["Authorization"] = newAccessToken;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure (e.g., redirect to login)
        console.error("Error refreshing token:", refreshError);
        // Redirect to login or handle logout
        // Example: window.location.href = '/login';
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
