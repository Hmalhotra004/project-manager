"use client";
import store from "@/store/store";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import "./globals.css";
require("dotenv").config();

const inter = Inter({ subsets: ["latin"], weight: ["100", "200", "300", "400"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Project Manager</title>
      </head>
      <body className={inter.className}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
