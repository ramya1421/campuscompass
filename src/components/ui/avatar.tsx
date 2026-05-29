import { cn } from "@/lib/utils";

export function Avatar({
  name,
  className,
}: {
  name?: string | null;
  className?: string;
}) {
  const initials = (name ?? "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white",
        className,
      )}
    >
      {initials}
    </div>
  );
}
