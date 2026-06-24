import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { useAuthStore } from "@/store/auth-store";

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data);
    },
  });
};