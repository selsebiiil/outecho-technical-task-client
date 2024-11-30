"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useRef } from "react";
export default function Navbar() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className=" sticky top-0 w-full  flex items-center justify-between p-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-lg border-b border-gray-500 z-20">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-4xl font-extrabold text-center">
            {" "}
            <span className="text-yellow-300">BotTalk</span>
          </h1>
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        {session ? (
          <div className="relative" ref={dropdownRef}>
            {/* Avatar Image */}
            <button onClick={toggleDropdown} className="focus:outline-none">
              <img
                src={session.user?.avatarUrl || "/globe.svg"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-gray-300 "
              />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white shadow-lg rounded-md z-10 border border-gray-600">
                <Link
                  href={`/profile/${session?.user?.id}`}
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md transition-colors"
                >
                  Profile
                </Link>
                <Link
                  href="/my-topics"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md transition-colors"
                >
                  My Topics
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md transition-colors"
                >
                  Settings
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="text-white hover:text-yellow-300 transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
