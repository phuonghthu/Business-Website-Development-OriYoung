import { useMutation } from "@tanstack/react-query";
import { userApi } from "../../api/user";

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (body) => userApi.updatePassword(body),
  });
};
