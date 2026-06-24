import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: (user) =>
        set({
          user,
          token: user.accessToken,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);