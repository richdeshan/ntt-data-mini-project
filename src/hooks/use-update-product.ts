import { updateProduct } from "@/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useUpdateProduct = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData: any) => updateProduct(id, productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-detail", id] });
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
    },
  });
};