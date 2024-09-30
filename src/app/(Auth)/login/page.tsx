"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passRef.current?.value;

    if (!password) {
      setErrorMessage("Password cannot be empty.");
      return;
    }

    if (!email) {
      setErrorMessage("Email cannot be empty.");
      return;
    }

    const values = { email, password };

    try {
      const response = await axios.post("/api/users/login", values);

      if (response.data.error) {
        setErrorMessage(response.data.error);
      } else {
        setErrorMessage(null);
        if (emailRef.current) emailRef.current.value = "";
        if (passRef.current) passRef.current.value = "";
        router.push("/");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data.error || "Login failed. Please try again.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  }

  function handleInputChange() {
    if (errorMessage) setErrorMessage(null);
  }

  return (
    <section className="flex justify-center items-center h-screen bg-stone-400">
      <div className="flex flex-col justify-center items-center bg-stone-900 rounded-xl p-4 w-[30rem]">
        <h1 className="text-stone-200 text-2xl">Login</h1>

        <form onSubmit={handleSubmit}>
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mt-4 rounded-sm focus:outline-none"
            onFocus={handleInputChange}
            value="hmalhotra@gmail.com"
          />
          <input
            ref={passRef}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mt-4 rounded-sm focus:outline-none"
            onFocus={handleInputChange}
            value="pass@123"
          />

          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 bg-stone-500 text-stone-100 rounded-sm hover:bg-stone-600 transition-colors"
          >
            Login
          </button>

          <div className="flex gap-2 mt-4">
            <p className="text-stone-200">Don&apos;t have an account?</p>
            <Link
              href="signup"
              className="text-stone-200 hover:text-stone-400 transition-all"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
