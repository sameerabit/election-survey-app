// components/Navbar.tsx
"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { logout, user } = useAuth();
  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-white text-2xl font-bold"
            >
              Referendum - Sri Lanka
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/survey"
              className="px-3 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-700"
            >
              Cast Your Vote
            </Link>
            {user?.username ? (
              <Link
                href="#profile"
                className="px-3 py-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-700"
              >
                Hi!, {user?.username}
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-3 py-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-700"
              >
                Login
              </Link>
            )}
            {user?.username ? (
              <button
                onClick={logout}
                className="text-white"
              >
                Logout
              </button>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
