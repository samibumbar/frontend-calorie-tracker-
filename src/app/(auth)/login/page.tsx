"use client";

import { Button, Input } from "@/components/atoms";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/services/auth/useAuth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      router.push("/private");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-md p-6 pt-12">
      <h2 className="text-2xl font-bold text-orange-500 mb-6">Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="w-50 flex flex-col gap-6">
          <Input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex gap-2 pt-10">
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
}
