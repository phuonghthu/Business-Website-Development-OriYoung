import { productsApi } from "../api/products";
import { useMutation } from "@tanstack/react-query";

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id) => productsApi.deleteProduct(id),
  });
};
