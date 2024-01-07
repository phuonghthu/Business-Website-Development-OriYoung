import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../api/products";
import { useSearchParams } from "react-router-dom";

export const useProductsByCategory = ({
  category = "",
  pageSize = 12,
  pageIndex = 1,
} = {}) => {
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get("category") ?? "all";
  const price = searchParams.get("price") ?? "maxPrice=50000000";
  const page = searchParams.get("page") ?? 1;
  return useQuery({
    queryKey: [
      "products",
      "products-by-category",
      category || categoryName,
      price,
      pageSize,
      page ?? pageIndex,
    ],
    queryFn: () =>
      productsApi.getProductsByCategory(category || categoryName, {
        pageSize,
        pageIndex: page ?? pageIndex,
        price,
      }),
  });
};
