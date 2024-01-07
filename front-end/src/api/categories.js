import axiosClient from "./axiosClient";

export const categoriesApi = {
  getAll() {
    return axiosClient.get(`/product/get-all-categories`);
  },
  addCategory(name) {
    return axiosClient.post(`/product/add-category`, name);
  },
  delete(id) {
    return axiosClient.delete(`/product/delete-category/${id}`);
  },
  updateCategory(id, name) {
    return axiosClient.put(`/product/update-category`, { id, name });
  },
};
