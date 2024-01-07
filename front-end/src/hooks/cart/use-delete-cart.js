import { useMutation } from "@tanstack/react-query";
import { cartApi } from "../../api/cart";

export const useDeleteCart = () => {
  return useMutation({
    mutationFn: (body) => cartApi.deleteProductFromCart(body),
  });
};
