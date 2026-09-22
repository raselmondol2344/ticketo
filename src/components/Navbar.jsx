"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaSignOutAlt, FaUser, FaThLarge } from "react-icons/fa";
import Logo from "./Logo";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
    router.push("/");

  };

 

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/65 backdrop-blur-md py-3.5 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <Logo />

        {/* NAVIGATION LINKS */}
        <div className="hidden sm:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === "/"
                ? "text-pink-500 font-semibold"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Home
          </Link>

          <Link
            href="/events"
            className={`text-sm font-medium transition-colors ${
              pathname.startsWith("/events")
                ? "text-pink-500 font-semibold"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Browse Events
          </Link>

          {session?.user && (
            <Link
              href={`/dashbord/${session.user.role}`}
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/dashboard")
                  ? "text-pink-500 font-semibold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">

          {/* NOT LOGGED IN */}
          {!session?.user && (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center justify-center font-semibold text-xs text-slate-300 hover:text-white h-9 px-4 rounded-xl hover:bg-white/5 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center font-semibold text-xs bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20 transition h-9 px-4 rounded-xl"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* LOGGED IN */}
          {session?.user && (
            <div className="flex items-center gap-3">

              {/* AVATAR + DROPDOWN */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center transition-transform hover:scale-105 outline-none focus:outline-none cursor-pointer"
                >
                  <Image
                    className="w-9 h-9 rounded-full object-cover border border-pink-500 shadow-md shadow-pink-500/10"
                    src={session.user.image}
                    alt="avatar"
                    width={36}
                    height={36}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-slate-900/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl py-2 z-50">

                    <Link
                      href={`/profile/${session.user.id}`}
                      onClick={() => setDropdownOpen(false)}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition"
                    >
                      <FaUser className="text-sm text-slate-400" />
                      <span>Profile</span>
                    </Link>

                    <Link
                      href={`/dashbord/${session.user.role}`}
                      onClick={() => setDropdownOpen(false)}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition"
                    >
                      <FaThLarge className="text-sm text-slate-400" />
                      <span>Dashboard</span>
                    </Link>

                    <div className="border-t border-white/5 my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition cursor-pointer"
                    >
                      <FaSignOutAlt className="text-sm" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>

              {/* LOGOUT BUTTON */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 justify-center font-semibold text-xs text-red-400 hover:text-red-300 h-9 px-3 rounded-xl hover:bg-red-500/5 transition"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>

            </div>
          )}

        </div>
      </div>
    </nav>
  );
}


