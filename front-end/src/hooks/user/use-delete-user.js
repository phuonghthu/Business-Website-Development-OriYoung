import { useMutation } from "@tanstack/react-query";
import { userApi } from "../../api/user";

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (id) => userApi.delete(id),
  });
};
