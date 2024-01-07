import axiosClient from "./axiosClient";

export const productsApi = {
  getAll() {
    return axiosClient.get(
      "/product/get-all-products?pageIndex=1&pageSize=100000"
    );
  },

  getProductsByCategory(
    categoryName,
    { pageSize = 10, pageIndex = 1, price } = {}
  ) {
    let filterCategory = "";
    if (categoryName) {
      filterCategory = `categoryName=${categoryName}&`;
    }
    return axiosClient.get(
      `/product/get-products-by-category?${filterCategory}${price}&pageSize=${pageSize}&pageIndex=${pageIndex}`
    );
  },
  getProductRelated(productId) {
    return axiosClient.get(`/product//get-related-products/${productId}`);
  },

  addProduct(body) {
    return axiosClient.post("/product/add-product", {
      ...body,
      price: parseFloat(body.price),
      quantity: parseInt(body.quantity),
    });
  },
  getProduct(id) {
    return axiosClient.get(`/product/get-product-detail/${id}`);
  },
  updateProduct(updateFields) {
    return axiosClient.put("/product/update-product", updateFields);
  },
  deleteProduct(id) {
    return axiosClient.delete(`/product/delete-product/${id}`);
  },
  getProductsByName(key) {
    return axiosClient.get(
      `/product/search-product?keyword=${key}&pageIndex=1&pageSize=1000000`
    );
  },
};
