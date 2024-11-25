import { Navbar } from "@/components/pages/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://crypt-media.vercel.app"),
  title: {
    default: "Crypt",
    template: `%s | Crypt`,
  },
  description:
    "Crypt offers students a confidential space to discuss academics, share insights, and connect with a supportive community anonymously.",
  openGraph: {
    description:
      "Crypt offers students a confidential space to discuss academics, share insights, and connect with a supportive community anonymously.",
    images: ["/og.png"],
    url: "https://crypt-media.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crypt",
    description:
      "Crypt offers students a confidential space to discuss academics, share insights, and connect with a supportive community anonymously.",
    creator: "@sohamgpt",
    images: ["/og.png"],
  },
};

export default async function RootLayout({
  children,
  authModal,
}: Readonly<{
  children: React.ReactNode;
  authModal: React.ReactNode;
}>) {
  const session = await getAuthSession();

  return (
    <html lang="en" className={cn("antialiased", inter.className)}>
      <body
        className={cn(
          "min-h-screen antialiased bg-background text-foreground",
          "dark:bg-black dark:text-white",
          inter.className
        )}
      >
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar session={session} />

          {authModal}

          <div
            className="container max-w-7xl mx-auto h-full pt-1 
            dark:bg-black dark:text-white"
          >
            {children}
          </div>

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
