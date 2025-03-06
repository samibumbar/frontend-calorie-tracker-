"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/services/auth/useAuth";

export function NavbarPrivate() {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full flex items-center justify-between bg-transparent p-6 align-center mt-10 pr-9">
      <div className="flex items-center">
        <div className="flex gap-6 items-center">
          <Link href="/private">
            <Image
              src="/svgs/logo-1.svg"
              alt="SlimMom Logo"
              width={150}
              height={32}
              className="cursor-pointer mb-7"
            />
          </Link>

          <div className="h-6 w-px bg-gray-400"></div>

          <Link href="/diary" className="text-gray-400 ">
            DIARY
          </Link>
          <Link href="/private" className="text-gray-400 ">
            CALCULATOR
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-900 font-semibold">
          {user?.name || "User"}
        </span>
        <div className="h-6 w-px bg-gray-300"></div>
        <button onClick={logout} className="font-bold">
          Exit
        </button>
      </div>
    </nav>
  );
}
