import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "@/api/product";

export const useProductDetail = (id: string) => {
  return useQuery({
    queryKey: ["product-detail", id],
    queryFn: () => getProductDetail(id),
    enabled: !!id,
  });
};