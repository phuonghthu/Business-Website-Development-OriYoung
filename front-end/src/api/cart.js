import axiosClient from "./axiosClient";

export const cartApi = {
  getCart() {
    return axiosClient.get(`/cart/get-cart-by-user-id`);
  },
  addProductToCart(body) {
    return axiosClient.post("/cart/add-product-to-cart", body);
  },
  updateProductInCart(body) {
    return axiosClient.put("/cart/update-product-in-cart", body);
  },
  deleteProductFromCart(id) {
    return axiosClient.delete(`/cart/delete-product-in-cart/${id}`);
  },
  deleteAll() {},
};
