"use client";
import Link from "next/link";
import React from "react";
import Cookies from "js-cookie";
import RevalidatePath from "@/actions";
import { usePathname } from "next/navigation";
export default function Navbar({ profile }: { profile: any }) {
  const pathname = usePathname();
  const onLogout = async () => {
    Cookies.remove("accessToken");
    RevalidatePath(pathname);
  };

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-lg font-semibold">
          <Link href="/">Online Courses</Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {profile?.id ? (
            <>
              <span className="text-sm text-gray-300">{profile.email}</span>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
