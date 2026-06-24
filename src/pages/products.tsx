import { useState, useEffect } from "react";
import { useProducts } from "@/hooks/use-products";
import { useDeleteProduct } from "@/hooks/use-delete-product";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function Products() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, isError } = useProducts(page, debouncedSearch);
  const { mutateAsync: deleteMutate, isPending: isDeleting } = useDeleteProduct();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleDeleteConfirm = async () => {
    if (!productIdToDelete) return;
    const targetId = productIdToDelete;
    setProductIdToDelete(null);

    try {
      await deleteMutate(targetId);
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-sm font-medium text-gray-500 animate-pulse">
          Loading products...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm text-center">
        Failed to load products. Please try again.
      </div>
    );
  }

  let products = data?.products || [];
  let totalProducts = data?.total || 0;

  if (debouncedSearch && products.length === 0) {
    const baseData: any = queryClient.getQueryData(["all-products", 1, ""]);
    const baseProducts = baseData?.products || [];

    const localFiltered = baseProducts.filter((product: any) =>
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    if (localFiltered.length > 0) {
      products = localFiltered;
      totalProducts = localFiltered.length;
    }
  }

  const totalPages = Math.max(Math.ceil(totalProducts / 8), 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground text-sm">
            Manage and view all your available products here.
          </p>
        </div>

        <div className="w-full max-w-sm flex gap-2">
          <Button
            onClick={() => navigate("/products/add")}
            className="h-9 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap hover:cursor-pointer"
          >
            Add Product
          </Button>
          <Input
            type="text"
            placeholder="Type to search products..."
            value={search}
            onChange={handleSearchChange}
            className="flex h-9 w-full rounded-md border border-Input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 text-sm text-gray-500 border rounded-xl bg-white">
          No products found for "{search}"
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product: any) => (
            <div
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
              className="relative group bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all hover:cursor-pointer hover:-translate-y-0.5"
            >
              <div className="absolute top-2 right-2 flex gap-1.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-amber-500 hover:text-white hover:border-amber-500 hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/products/edit/${product.id}`);
                  }}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-destructive hover:text-white hover:border-destructive hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProductIdToDelete(product.id);
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="p-4 space-y-3">
                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center border">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm line-clamp-1 text-gray-900">
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 min-h-[32px]">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 mt-auto flex items-center justify-between">
                <span className="text-base font-bold text-blue-600">
                  ${product.price}
                </span>
                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium uppercase tracking-wider">
                  {product.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between border-t pt-4">
        <Button
          variant="outline"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="hover:cursor-pointer"
        >
          Previous
        </Button>

        <span className="text-sm text-gray-600 font-medium">
          Page {page} of {totalPages}
        </span>

        <Button
          variant="outline"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="hover:cursor-pointer"
        >
          Next
        </Button>
      </div>

      <AlertDialog open={productIdToDelete !== null} onOpenChange={(open) => !open && setProductIdToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-white hover:bg-destructive/90 hover:cursor-pointer"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}