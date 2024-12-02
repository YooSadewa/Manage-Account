import Link from "next/link";
import ActiveLink from "./ActiveLink";
import { signOut } from "next-auth/react";


export default function Navbar() {
  return (
    <div className="bg-[#0B192C] fixed w-full z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="#" className="-m-1.5 p-1.5">
            <img src="/UIB.webp" alt="UIB Logo" className="h-8 w-auto" />
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <ActiveLink href="/">Home</ActiveLink>
          <ActiveLink href="/group">Manage Group Account</ActiveLink>
          <ActiveLink href="/profile">Manage My Profile</ActiveLink>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button onClick={() => signOut({ callbackUrl: "/login" })} className="text-sm font-semibold text-white">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}
