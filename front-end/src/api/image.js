import axiosClient from "./axiosClient";

export const imageApi = {
  upload(formData) {
    return axiosClient.post("/product/upload-image", formData);
  },
};
