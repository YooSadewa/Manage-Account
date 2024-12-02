"use client";
import { signOut } from "next-auth/react";

export default function Page() {
  return (
    <>
      <button
        className="p-5 bg-gray-500 mt-5 ms-5 rounded font-bold fixed"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Logout?
      </button>
      <div className="flex justify-center h-screen">
        <h1 className="text-[24px] flex items-center">Hello Dunia</h1>
      </div>
    </>
  );
}
