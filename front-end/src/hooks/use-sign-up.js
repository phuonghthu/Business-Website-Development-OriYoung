import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (body) => authApi.signUp(body),
  });
};
