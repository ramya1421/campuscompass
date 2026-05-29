"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  BookOpen,
  GitCompare,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const links = [
  { href: "/colleges", label: "Colleges", icon: GraduationCap },
  { href: "/discussions", label: "Discussions", icon: MessageSquare },
  { href: "/compare", label: "Compare", icon: GitCompare },
  { href: "/predictor", label: "AI Predictor", icon: Sparkles },
  { href: "/saved", label: "Saved", icon: BookOpen },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
          <div className="rounded-lg bg-blue-600 p-1.5 text-white">
            <GraduationCap className="h-4 w-4" />
          </div>
          {APP_NAME}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname.startsWith(link.href)
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {session?.user ? (
            <>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {session.user.name ?? session.user.email}
              </span>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 px-4 py-4 lg:hidden dark:border-slate-800">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <ThemeToggle />
              {session?.user ? (
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  Logout
                </Button>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" size="sm">Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm">Sign up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
