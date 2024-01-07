import { useMutation } from "@tanstack/react-query";
import { categoriesApi } from "../api/categories";

export const useAddCategory = () => {
  return useMutation({
    mutationFn: (categoryName) => categoriesApi.addCategory(categoryName),
  });
};
