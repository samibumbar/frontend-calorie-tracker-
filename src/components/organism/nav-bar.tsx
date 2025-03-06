import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="w-full flex items-center">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/svgs/logo-1.svg"
            alt="SlimMom Logo"
            width={150}
            height={32}
            className="pr-4 pb-7 cursor-pointer"
          />
        </Link>
      </div>
      <div className="h-6 w-px bg-gray-300 "></div>
      <div className="flex items-center gap-4 space-x-6 pl-4">
        <Link
          href="/login"
          className="text-gray-500 hover:text-gray-900 font-small font-bold"
        >
          LOG IN
        </Link>
        <Link
          href="/signup"
          className="text-gray-500 hover:text-gray-900 font-small  font-bold"
        >
          REGISTER
        </Link>
      </div>
    </nav>
  );
}
