import { useQuery } from "@tanstack/react-query";
import { userApi } from "../../api/user";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => userApi.getMe(),
  });
};
