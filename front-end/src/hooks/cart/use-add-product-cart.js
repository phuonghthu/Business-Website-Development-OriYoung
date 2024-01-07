import { useMutation } from "@tanstack/react-query";
import { cartApi } from "../../api/cart";

export const useAddProductCart = () => {
  return useMutation({
    mutationFn: (body) => cartApi.addProductToCart(body),
  });
};
