import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductDetail } from "@/hooks/use-product-detail";
import { useDeleteProduct } from "@/hooks/use-delete-product";
import { Button } from "@/components/ui/button";
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

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: product, isLoading, isError } = useProductDetail(id || "");
  const { mutateAsync: deleteMutate, isPending: isDeleting } = useDeleteProduct();
  
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleteOpen(false);
    try {
      await deleteMutate(id || "");
      toast.success("Product deleted successfully!");
      navigate("/products");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-sm font-medium text-gray-500 animate-pulse">
          Loading product details...
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm text-center">
          Product not found or failed to load.
        </div>
        <Button variant="outline" onClick={() => navigate("/products")}>
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => navigate("/products")}
          className="hover:cursor-pointer"
        >
          Back to Products
        </Button>

        <div className="flex gap-2">
          <Button
            onClick={() => navigate(`/products/edit/${product.id}`)}
            className="bg-amber-500 text-white hover:bg-amber-600 hover:cursor-pointer"
          >
            Edit Product
          </Button>
          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={() => setIsDeleteOpen(true)}
            className="hover:cursor-pointer"
          >
            {isDeleting ? "Deleting..." : "Delete Product"}
          </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 bg-white border p-6 rounded-xl shadow-sm">
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center border">
            <img
              src={product.thumbnail || "https://placehold.co/400"}
              alt={product.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images?.slice(0, 4).map((img: string, index: number) => (
              <div key={index} className="aspect-square bg-gray-50 border rounded-lg overflow-hidden">
                <img src={img} alt="" className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {product.category}
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 pt-2">
                {product.title}
              </h2>
              <p className="text-sm text-gray-500">Brand: {product.brand || "Generic"}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-blue-600">${product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="text-sm bg-red-50 text-red-600 px-2 py-0.5 rounded font-medium">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-900">Description</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t pt-4 text-sm">
              <div>
                <span className="text-gray-500 block">Rating</span>
                <span className="font-semibold text-gray-900">⭐ {product.rating || 5} / 5</span>
              </div>
              <div>
                <span className="text-gray-500 block">Stock Status</span>
                <span className={`font-semibold ${product.stock > 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {product.stock > 0 ? `${product.stock} units available` : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
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
              onClick={handleDelete}
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