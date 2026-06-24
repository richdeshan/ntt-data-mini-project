import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAllProducts } from "@/api/product";

export const useProducts = (page: number, search: string) => {
  return useQuery({
    queryKey: ["all-products", page, search],
    queryFn: () => getAllProducts(page, search),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};