import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "@/pages/auth/login";
import ProtectedRoute from "@/routes/protected-route";
import App from "@/App";
import { Products } from "@/pages/products";
import { ContentApp } from "@/components/layouts/app-content";
import { ProductDetail } from "@/pages/product-detail";
import { AddProduct } from "@/pages/product-add";
import { EditProduct } from "@/pages/product-edit";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element:<ContentApp/>
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/add",
        element: <AddProduct />,
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
      },
      {
        path: "products/edit/:id",
        element: <EditProduct />,
      },
    ],
  },
]);
