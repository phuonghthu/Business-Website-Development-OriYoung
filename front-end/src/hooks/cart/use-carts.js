import { useQuery } from "@tanstack/react-query";
import { cartApi } from "../../api/cart";

export const useCarts = () => {
  return useQuery({
    queryKey: ["carts"],
    queryFn: () => cartApi.getCart(),
  });
};
