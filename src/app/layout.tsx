"use client";
import store from "@/store/store";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>Project Manager</title>
        </head>
        <body className={inter.className}>
          <Provider store={store}>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
