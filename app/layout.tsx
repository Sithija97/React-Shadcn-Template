import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/common/header";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const user = await currentUser();
  const displayName = user ? user?.firstName + " " + user?.lastName : "";

  return {
    title: user ? `LinkedIn | ${displayName}` : "LinkedIn",
    description: "A LinkedIn clone built with Next.js and Clerk",
    icons: {
      icon: "https://static.licdn.com/aero-v1/sc/h/akt4ae504epesldzj74dzred8",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        >
          {/* toaster */}
          <Toaster position="bottom-left" />

          {/* header */}
          <header className="border-b sticky top-0 bg-white z-50">
            <Header />
          </header>

          <div className="bg-[#F4F2ED] flex-1 w-full">
            <main className="max-w-6xl mx-auto">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
