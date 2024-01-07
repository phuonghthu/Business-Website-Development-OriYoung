import axiosClient from "./axiosClient";

export const authApi = {
  login(body) {
    return axiosClient.post("/user/login", {
      phone: body.phone,
      password: body.password,
    });
  },
  signUp(body) {
    return axiosClient.post("/user/register", {
      phone: body.phone,
      password: body.password,
    });
  },
  getAccessToken(refreshToken) {
    return axiosClient.get("/user/refresh-token", { refreshToken });
  },
};
