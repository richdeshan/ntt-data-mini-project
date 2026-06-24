import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProduct } from "@/hooks/use-create-product";
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

export function AddProduct() {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateProduct();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    thumbnail: "",
  });

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmOpen(true);
  };

  const handleRealSubmit = () => {
    setIsConfirmOpen(false);

    const payload = {
      ...form,
      price: Number(form.price),
      brand: "Generic",
      discountPercentage: 0,
      rating: 5,
      stock: 10,
      images: [form.thumbnail || "https://placehold.co/400"],
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success("Product created successfully!");
        navigate("/products");
      },
      onError: () => {
        toast.error("Failed to create product");
      },
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Add New Product</h2>
        <p className="text-muted-foreground text-sm">
          Create a new product item by filling out the form below.
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
            placeholder="e.g. iPhone 15 Pro"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Price ($)</label>
            <Input
              type="number"
              required
              min="1"
              step="any"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="999"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <Input
              type="text"
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="e.g. smartphones"
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
            placeholder="https://images.unsplash.com/photo-..."
          />
        </div>

        {form.thumbnail && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Image Preview</label>
            <div className="aspect-square w-32 bg-gray-50 border rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
              <img
                src={form.thumbnail}
                alt="Preview"
                className="object-cover w-full h-full"
              />
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
            placeholder="Write product description here..."
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/products")}
            className="hover:cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 text-white hover:bg-blue-700 hover:cursor-pointer"
          >
            {isPending ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </form>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Product?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to add this new product?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRealSubmit}
              className="bg-blue-600 text-white hover:bg-blue-700 hover:cursor-pointer"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}