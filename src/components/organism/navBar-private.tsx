"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "@/services/auth/useAuth";

export function NavbarPrivate({
  setActiveComponent,
  activeComponent,
}: {
  setActiveComponent: (component: string) => void;
  activeComponent: string;
}) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="w-full flex items-center justify-between bg-white md:bg-transparent p-6 align-center pr-9">
        <div className="flex items-center">
          <div className="flex gap-6 items-center">
            <button onClick={() => setActiveComponent("calculator")}>
              <Image
                src="/svgs/logo-1.svg"
                alt="SlimMom Logo"
                width={150}
                height={32}
                className="cursor-pointer mb-7"
              />
            </button>

            <div className="h-6 w-px bg-gray-400"></div>

            <div className="hidden md:flex gap-6">
              <button
                onClick={() => setActiveComponent("diary")}
                className={`text-gray-400  ${
                  activeComponent === "diary" ? "text-black font-bold" : ""
                }`}
              >
                DIARY
              </button>
              <button
                onClick={() => setActiveComponent("calculator")}
                className={`text-gray-400  ${
                  activeComponent === "calculator" ? "text-black font-bold" : ""
                }`}
              >
                CALCULATOR
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-900 font-semibold">
            {user?.name || "User"}
          </span>
          <div className="h-6 w-px bg-gray-300"></div>
          <button
            onClick={logout}
            className="font-bold text-red-500 hover:text-red-700"
          >
            Exit
          </button>

          <button
            className="md:hidden text-gray-600 hover:text-gray-800 cursor-pointer"
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu size={28} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 bg-[#1F3A5F] text-white flex flex-col items-center justify-center z-50">
          <button
            className="absolute top-6 right-6 text-white cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            <FiX size={28} />
          </button>

          <button
            onClick={() => {
              setActiveComponent("diary");
              setMenuOpen(false);
            }}
            className={`text-lg font-semibold mb-6 ${
              activeComponent === "diary" ? "text-white" : "text-gray-400"
            }`}
          >
            DIARY
          </button>
          <button
            onClick={() => {
              setActiveComponent("calculator");
              setMenuOpen(false);
            }}
            className={`text-2xl font-bold ${
              activeComponent === "calculator" ? "text-white" : "text-gray-400"
            }`}
          >
            CALCULATOR
          </button>
        </div>
      )}
    </>
  );
}
