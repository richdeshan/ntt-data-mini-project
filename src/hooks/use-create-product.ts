import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/api/product";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
    },
  });
};