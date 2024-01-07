import { useMutation } from "@tanstack/react-query";
import { categoriesApi } from "../api/categories";

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (id) => categoriesApi.delete(id),
  });
};
