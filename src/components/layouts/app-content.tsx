import { useAuthStore } from "@/store/auth-store";
import { useProducts } from "@/hooks/use-products";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, Layers, Plus, ArrowUpRight, ShoppingBag } from "lucide-react";

export function ContentApp() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  
  const { data: productsData, isLoading } = useProducts(1, "");
  const totalProducts = productsData?.total || 0;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Welcome back, {user?.firstName} {user?.lastName}!
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Here's what's happening with your store product management today.
          </p>
        </div>
        <div>
          <Button 
            onClick={() => navigate("/products/add")}
            className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 hover:cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Product</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Total Products</p>
            <h3 className="text-3xl font-bold text-gray-900">
              {isLoading ? "..." : totalProducts}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Package className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Active Categories</p>
            <h3 className="text-3xl font-bold text-gray-900">20</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <Layers className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Warehouse Status</p>
            <h3 className="text-3xl font-bold text-emerald-600">Good Condition</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <ShoppingBag className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h3 className="font-semibold text-gray-900">Quick Shortcuts</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Easily navigate to system features.</p>
        </div>
        <div className="p-6 grid gap-4 sm:grid-cols-2">
          <div 
            onClick={() => navigate("/products")}
            className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">View Product Inventory</p>
                <p className="text-xs text-muted-foreground">Browse, search, and manage all your stock items.</p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>

          <div 
            onClick={() => navigate("/products/add")}
            className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Plus className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Create Product Entry</p>
                <p className="text-xs text-muted-foreground">Fill out data forms to simulate adding warehouse items.</p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}