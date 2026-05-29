import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="mt-6">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
