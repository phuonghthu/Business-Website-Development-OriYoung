import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../api/products";
import { useParams } from "react-router-dom";

export const useProduct = () => {
  let { id } = useParams();
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => productsApi.getProduct(id),
  });
};
