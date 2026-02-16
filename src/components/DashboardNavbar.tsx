import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { STORAGE_KEYS } from "../utils/storage";

interface DashboardNavbarProps {
  children?: React.ReactNode;
}

export function DashboardNavbar({ children }: DashboardNavbarProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.SAVED_EMAIL);
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
    navigate("/signin");
  };

  return (
    <>
      <div className="relative z-10">
        <nav className="flex items-center justify-between bg-white border-b border-gray-200 px-8 py-4 md:px-[60px]">
          <a
            href="/"
            className="flex items-center gap-3 font-bold cursor-pointer hover:opacity-80 transition"
          >
            <img
              alt="Hintro logo"
              className="h-12 w-12 rounded-lg object-cover"
              src="https://hintro-releases.s3.ap-south-1.amazonaws.com/images/hintroai.jpeg"
            />
            <span className="text-xl font-bold text-neutral-900 md:text-2xl">
              Hintro
            </span>
          </a>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="rounded-lg bg-black px-6 py-2 text-white font-medium hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </nav>

        <main className="min-h-[calc(100vh-80px)]">{children}</main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          {/* Subtle blurred background */}
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setShowLogoutModal(false)}
          ></div>

          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow-lg p-8 max-w-sm mx-4">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-2">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You'll need to sign in again to
              access your dashboard.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
