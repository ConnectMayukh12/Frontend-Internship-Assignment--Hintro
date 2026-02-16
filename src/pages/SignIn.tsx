import { useEffect } from "react";
import { SignInForm } from "../components/SignInForm";

export default function SignIn() {
  useEffect(() => {
    document.title = "Sign In - Hintro";
  }, []);
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
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
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignInForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://img.freepik.com/free-photo/notebook-with-list-desk-with-cup-coffee-beside_23-2148938738.jpg"
          alt="Sign in visual"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
