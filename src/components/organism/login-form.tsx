"use client";

import { memo, useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Button, Input } from "@/components/atoms";
import { useAuth } from "@/services/auth/useAuth";
import { toast } from "react-toastify";

const LoginFormComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("userName", data.user.name);
      setUser({ name: data.user.name });
      toast.success("Login successful! 🎉");
      router.push("/private");
    } catch {
      toast.error("Invalid email or password. Try again!");
    }
  };

  return (
    <div className="w-full max-w-md p-6 pt-12 mx-auto">
      <h2 className="text-2xl font-bold text-orange-500 mb-6">Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="w-50 flex flex-col gap-6">
          <Input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col gap-2 pt-10">
          <Button type="submit" color="primary" variant="filled" size="sm">
            Log In
          </Button>
          <Button
            type="button"
            color="white"
            variant="outline"
            size="sm"
            onClick={() => router.push("/signup")}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export const LoginForm = memo(LoginFormComponent);
export default LoginForm;
