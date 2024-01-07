import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { productsApi } from "../api/products";

export const useProductsRelated = () => {
  const { id } = useParams();

  return useQuery({
    queryKey: ["products", "products-related", id],
    queryFn: () => productsApi.getProductRelated(id),
  });
};
