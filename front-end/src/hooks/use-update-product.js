import { useMutation } from "@tanstack/react-query";
import { productsApi } from "../api/products";

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: async (updateFields) => productsApi.updateProduct(updateFields),
  });
};
