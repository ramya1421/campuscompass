import type { Metadata } from "next";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { Providers } from "@/components/shared/providers";
import { APP_NAME } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Discover colleges, compare options, join discussions, and get AI-powered admission recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <Navbar />
          <main className="mx-auto min-h-[calc(100vh-8rem)] max-w-7xl px-4 py-8 sm:px-6">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
