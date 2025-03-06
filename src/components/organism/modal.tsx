"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "../atoms/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-[1px] backdrop-brightness-85 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-md w-full relative text-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <Button
            onClick={onClose}
            color="white"
            variant="filled"
            size="md"
            className="mt-4"
          >
            x
          </Button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
