"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { z } from "zod";

import AuthSocialButton from "@/components/auth/AuthSocialButton";
import FormInput from "@/components/auth/FormInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .toLowerCase(),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") router.push("/");
  }, [session, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    form.reset();

    signIn("credentials", {
      ...values,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error)
          form.setError("root", {
            message: "Invalid Credentials",
          });
        if (callback?.ok && !callback?.error) {
          router.push("/");
        }
      })
      .finally(() => setIsLoading(false));
  }

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        // if (callback?.error) toast.error("Invaild credentials");
        // if (callback?.ok && !callback?.error) toast.success("Logged in");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      <div className="sm:mx-auto sm:w-full sm:max-w-md border-stone-200 border-2">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-stone-900">
          Log in to your account
        </h2>
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 sm:px-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel id="email">Email Address</FormLabel>
                      <FormControl>
                        <FormInput
                          id="email"
                          type="text"
                          field={field}
                          disabled={isLoading}
                          autoComplete="email"
                          fieldState={fieldState}
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel id="password">Password</FormLabel>
                      <FormControl>
                        <FormInput
                          id="password"
                          type="password"
                          field={field}
                          disabled={isLoading}
                          fieldState={fieldState}
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormMessage className="text-lg">
                  {form.formState.errors.root?.message}
                </FormMessage>

                <Button
                  disabled={isLoading}
                  type="submit"
                  className="w-full"
                >
                  Log in
                </Button>
              </form>
            </Form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>

                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    or continue with
                  </span>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <AuthSocialButton
                  icon={BsGithub}
                  onClick={() => socialAction("github")}
                />
                <AuthSocialButton
                  icon={BsGoogle}
                  onClick={() => socialAction("google")}
                />
              </div>
            </div>
            <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
              <div>New to Projectly</div>
              <a
                href="/sign-up"
                className="underline cursor-pointer"
              >
                Create an account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
