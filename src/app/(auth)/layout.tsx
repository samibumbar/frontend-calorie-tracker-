"use client";

import { PublicLayout } from "@/components/layouts";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayout>{children}</PublicLayout>;
}
