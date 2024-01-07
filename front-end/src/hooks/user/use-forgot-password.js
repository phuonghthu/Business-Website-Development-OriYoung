import { useMutation } from "@tanstack/react-query";
import { userApi } from "../../api/user";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (body) => userApi.forgotPassword(body),
  });
};
