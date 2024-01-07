import { useMutation } from "@tanstack/react-query";
import { productsApi } from "../api/products";

export const useAddProduct = () => {
  return useMutation({
    mutationFn: (body) => productsApi.addProduct(body),
  });
};
