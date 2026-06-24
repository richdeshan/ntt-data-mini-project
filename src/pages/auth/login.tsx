import { LoginForm } from "@/components/login-form";
import { Package } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col p-6 md:p-10">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Package className="size-5" />
          </div>

          <div>
            <h1 className="font-semibold text-lg">NTT Mini Project</h1>
            <p className="text-sm text-muted-foreground">
              Product Management System
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
          alt="Login Illustration"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-3xl font-bold">Manage Your Products Easily</h2>
          <p className="mt-2 max-w-md text-sm text-white/80">
            Login to access product list, details, and manage your inventory.
          </p>
        </div>
      </div>
    </div>
  );
}
