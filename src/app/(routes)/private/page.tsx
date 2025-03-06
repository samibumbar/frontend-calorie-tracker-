"use client";

import { PrivateLayout } from "@/components/layouts";

export default function PrivatePage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateLayout>{children}</PrivateLayout>;
}
