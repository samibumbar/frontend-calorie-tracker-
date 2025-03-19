"use client";

import { Navbar } from "@/components/organism/nav-bar";
import Image from "next/image";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex">
      <div className="w-full flex justify-between gap-8 overflow-hidden">
        <div className="flex flex-col gap-0 pt-0 md:gap-20 md:pt-10">
          <Navbar />
          <div className="mx-auto">{children}</div>
        </div>

        <div className="hidden md:flex flex-col items-end justify-end relative">
          <Image
            src="/images/banana.png"
            alt="Banana"
            width={650}
            height={160}
            className="top-0 absolute -right-25"
          />

          <Image
            src="/images/vector.png"
            alt="Vector"
            width={700}
            height={70}
          />
          <Image
            src="/images/strawberry.png"
            alt="Strawberry"
            width={300}
            height={128}
            className="absolute"
          />
        </div>
      </div>

      <Image
        src="/images/leaves.png"
        alt="Leaves"
        width={746}
        height={846}
        className="hidden md:block absolute right-50 top-0"
      />
    </div>
  );
}
