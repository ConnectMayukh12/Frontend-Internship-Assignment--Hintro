import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import "../components/Loader.css";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 - Page Not Found";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#ffe6c7] via-[#cfe0ff] to-[#b6f3e3] p-8">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          Oops! The hamster couldn't find the page you're looking for. It seems
          to have run off the wheel!
        </p>

        <div className="mb-8">
          <Loader />
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-black px-6 py-3 text-white font-medium hover:bg-gray-800 transition"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg border-2 border-black px-6 py-3 text-black font-medium hover:bg-black hover:text-white transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
