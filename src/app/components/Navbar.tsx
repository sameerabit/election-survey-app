// components/Navbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout, user } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-custom-purple">
      <div className="max-w-7xl py-2 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-white text-xs sm:text-sm md:text-base lg:text-2xl font-bold"
            >
              <Image
                src="/logo.png"
                width={300}
                height={100}
                alt={"Vote Globe"}
                className="mr-2"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4 mx-2">
            <div className="hidden sm:block">
              <Link
                href="/survey"
                className="px-3 py-2 m-2  text-xs sm:text-sm md:text-base lg:text-xl font-medium text-white bg-black rounded-md hover:bg-black"
              >
                Cast Your Vote
              </Link>
              {/* {user?.username ? (
                <>
                  <Link
                    href="#profile"
                    className="px-3 py-2 m-2 sm:text-sm md:text-base lg:text-xl font-medium text-white bg-gray-500 rounded-md hover:bg-gray-700"
                  >
                    Hi!, {user?.username}
                  </Link>
                  <button
                    onClick={logout}
                    className="px-3 py-2 sm:text-sm md:text-base lg:text-xl font-medium text-white bg-gray-500 rounded-md hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-3 py-2 sm:text-sm md:text-base lg:text-xl font-medium text-white bg-gray-500 rounded-md hover:bg-gray-700"
                >
                  Login
                </Link>
              )} */}
            </div>
            <div className="sm:hidden">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div className="sm:hidden">
            <Link
              href="/survey"
              className="block px-3 py-2 text-base font-medium text-center text-white bg-black rounded-md hover:bg-black"
            >
              Cast Your Vote
            </Link>
            {/* {user?.username ? (
              <>
                <Link
                  href="#profile"
                  className="block px-3 m-2 py-2 text-base text-center font-medium text-white bg-gray-500 rounded-md hover:bg-gray-700"
                >
                  Hi!, {user?.username}
                </Link>
                <Link
                  href="#"
                  onClick={logout}
                  className="block px-3 m-2 py-2 text-base text-center font-medium text-white bg-gray-500 rounded-md hover:bg-gray-700"
                >
                  Logout
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="block px-3 py-2 m-2 text-base font-medium text-white bg-gray-500 rounded-md hover:bg-gray-700"
              >
                Login
              </Link>
            )} */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
