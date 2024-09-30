"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

const Page = () => {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const conPassRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passRef.current?.value;
    const conPassword = conPassRef.current?.value;

    if (!password || !conPassword) {
      setErrorMessage("Password and confirm password fields cannot be empty.");
      return;
    }

    if (password !== conPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!name || !email) {
      setErrorMessage("Name and email fields cannot be empty.");
      return;
    }

    const values = {
      name,
      email,
      password,
    };

    try {
      await axios.post("/api/users", values);
      if (nameRef.current) nameRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (passRef.current) passRef.current.value = "";
      if (conPassRef.current) conPassRef.current.value = "";
      router.refresh();
    } catch (err) {
      console.log(err);
      setErrorMessage("Failed to sign up. Please try again.");
    }
  };

  return (
    <section className="flex justify-center items-center h-screen bg-stone-400">
      <div className="flex flex-col justify-center items-center bg-stone-900 rounded-xl p-4 w-[30rem]">
        <h1 className="text-stone-200 text-2xl">Signup</h1>

        <form onSubmit={handleSubmit}>
          <input
            ref={nameRef}
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 mt-4 rounded-sm focus:outline-none"
          />
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mt-4 rounded-sm focus:outline-none"
          />
          <input
            ref={passRef}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mt-4 rounded-sm focus:outline-none"
          />
          <input
            ref={conPassRef}
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 mt-4 rounded-sm focus:outline-none"
          />

          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 bg-stone-500 text-stone-100 rounded-sm hover:bg-stone-600 transition-colors"
          >
            Sign up
          </button>

          <div className="flex gap-2 mt-4">
            <p className="text-stone-200">Already have an account? </p>
            <Link
              href="login"
              className="text-stone-200 hover:text-stone-400 transition-all"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Page;
