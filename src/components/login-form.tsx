import { useState } from "react";
import { useLogin } from "@/hooks/use-login";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function LoginForm() {
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: () => {
        toast.success("Welcome back! Login successful.");
        navigate("/dashboard");
      },
      onError: () => {
        toast.error("Invalid username or password");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Username"
        required
        value={form.username}
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <Input
        type="password"
        placeholder="Password"
        required
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <Button
        type="submit"
        className="w-full hover:cursor-pointer"
        disabled={isPending}
      >
        {isPending ? "Loading..." : "Login"}
      </Button>
    </form>
  );
}