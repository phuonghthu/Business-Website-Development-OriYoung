import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth";

export const useSignIn = () => {
  return useMutation({
    mutationFn: (body) => authApi.login(body),
  });
};
