import { useMutation } from "@tanstack/react-query";
import { userApi } from "../../api/user";

export const useUpdateProfile = () => {
  return useMutation({ mutationFn: (body) => userApi.updateMe(body) });
};
