import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/pages/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Crypt",
  description:
    "Crypt offers students a confidential space to discuss academics, share insights, and connect with a supportive community anonymously.",
};

export default function RootLayout({
  children,
  authModal,
}: Readonly<{
  children: React.ReactNode;
  authModal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased light",
        inter.className
      )}
    >
      <body className={cn("min-h-screen antialiased", inter.className)}>
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          {authModal}

          <div className="container max-w-7xl mx-auto h-full pt-1">
            {children}
          </div>

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
