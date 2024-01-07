import { useMutation } from "@tanstack/react-query";
import { cartApi } from "../../api/cart";

export const useUpdateCart = () => {
  return useMutation({
    mutationFn: (body) => cartApi.updateProductInCart(body),
  });
};
