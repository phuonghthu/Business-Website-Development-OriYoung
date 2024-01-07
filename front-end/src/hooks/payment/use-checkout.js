import { useMutation } from "@tanstack/react-query";
import { paymentApi } from "../../api/payment";

export const useCheckout = () => {
  return useMutation({
    mutationFn: () => paymentApi.checkout(),
  });
};
