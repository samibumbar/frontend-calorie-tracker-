"use client";

import { memo, useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Button, Input } from "@/components/atoms";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = { name, email, password };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed");
      }

      toast.success("Account created successfully! 🎉 Redirecting...");
      setTimeout(() => router.push("/login"), 3000);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
      toast.error(
        error instanceof Error ? error.message : "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 pt-12">
      <h2 className="text-2xl font-bold text-orange-500 mb-6">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="w-50 flex flex-col gap-6">
          <Input
            type="text"
            placeholder="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
        <div className="flex gap-2 pt-10">
          <Button
            type="submit"
            color="primary"
            variant="filled"
            size="sm"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
          <Button
            color="white"
            variant="outline"
            size="sm"
            onClick={() => router.push("/login")}
          >
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
export const SignupForm = memo(RegisterForm);
