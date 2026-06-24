import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductDetail } from "@/hooks/use-product-detail";
import { useUpdateProduct } from "@/hooks/use-update-product";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: apiProduct, isLoading, isError } = useProductDetail(id || "");
  const { mutateAsync, isPending } = useUpdateProduct(id || "");

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    thumbnail: "",
  });

  let product = apiProduct;
  if (isError || (!isLoading && !apiProduct)) {
    const baseData: any = queryClient.getQueryData(["all-products", 1, ""]);
    const baseProducts = baseData?.products || [];
    const localProduct = baseProducts.find((p: any) => String(p.id) === String(id));
    if (localProduct) product = localProduct;
  }

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        price: String(product.price || ""),
        category: product.category || "",
        description: product.description || "",
        thumbnail: product.thumbnail || "",
      });
    }
  }, [product]);

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmOpen(true);
  };

  const handleRealSubmit = async () => {
    setIsConfirmOpen(false);
    
    const payload = {
      title: form.title,
      category: form.category,
      description: form.description,
      thumbnail: form.thumbnail,
      price: Number(form.price),
    };

    try {
      await mutateAsync(payload);
      toast.success("Product updated successfully!");
      navigate(`/products/${id}`);
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  if (isLoading && !product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-sm font-medium text-gray-500 animate-pulse">
          Loading product data...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm text-center">
          Product data not found.
        </div>
        <Button variant="outline" onClick={() => navigate("/products")}>
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Edit Product</h2>
        <p className="text-muted-foreground text-sm">
          Modify the product details using the form below.
        </p>
      </div>

      <form onSubmit={handlePreSubmit} className="bg-white border p-6 rounded-xl shadow-sm space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Product Title</label>
          <Input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Price ($)</label>
            <Input
              type="number"
              required
              step="any"
              min="1"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <Input
              type="text"
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Product Image URL</label>
          <Input
            type="url"
            required
            value={form.thumbnail}
            onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
          />
        </div>

        {form.thumbnail && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Image Preview</label>
            <div className="aspect-square w-32 bg-gray-50 border rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
              <img src={form.thumbnail} alt="Preview" className="object-cover w-full h-full" />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/products/${id}`)}
            className="hover:cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 text-white hover:bg-blue-700 hover:cursor-pointer"
          >
            {isPending ? "Updating..." : "Update Product"}
          </Button>
        </div>
      </form>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save Changes?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to update this product details? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRealSubmit} className="bg-blue-600 text-white hover:bg-blue-700 hover:cursor-pointer">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}