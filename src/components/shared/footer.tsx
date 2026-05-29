import { APP_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-sm text-slate-500 sm:px-6">
        <p className="font-medium text-slate-700 dark:text-slate-300">{APP_NAME}</p>
        <p>Modern college discovery, comparison, and student discussions.</p>
        <p>Built for internship-grade production readiness.</p>
      </div>
    </footer>
  );
}
