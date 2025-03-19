"use client";

import { memo } from "react";
import { PrivateLayout } from "@/components/layouts";

const PrivatePage = memo(() => {
  return <PrivateLayout />;
});

PrivatePage.displayName = "PrivatePage";

export default PrivatePage;
