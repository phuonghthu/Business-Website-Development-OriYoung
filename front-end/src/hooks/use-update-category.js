import { useMutation } from "@tanstack/react-query";
import { categoriesApi } from "../api/categories";

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: ({ id, name }) => categoriesApi.updateCategory(id, name),
  });
};
