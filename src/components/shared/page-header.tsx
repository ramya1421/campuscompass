export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
