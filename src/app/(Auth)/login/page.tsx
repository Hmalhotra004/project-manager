import { AppDispatch } from "@/store/store";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useRef } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    redirect("/");
    const email = emailRef.current?.value;
    const password = passRef.current?.value;

    console.log(email, password);

    // if (emailRef.current) emailRef.current.value = "";
    // if (passRef.current) passRef.current.value = "";
  }

  return (
    <section className=" flex justify-center items-center h-screen bg-stone-400">
      <div className="flex flex-col justify-center items-center bg-stone-900 rounded-xl p-4 w-[30rem]">
        <h1 className="text-stone-200 text-2xl">Login</h1>

        <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 bg-stone-500 text-stone-100 rounded-sm hover:bg-stone-600 transition-colors"
          >
            Login
          </button>

          <div className="flex gap-2 mt-4">
            <p className=" text-stone-200">Don&apos;t have an account? </p>
            <Link
              href="Signup"
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
