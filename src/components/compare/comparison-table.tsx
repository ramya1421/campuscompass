"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { College, Course } from "@/generated/prisma/client";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { cn } from "@/lib/utils";

type CompareCollege = College & { courses: Course[] };

type MetricRow = {
  metric: string;
  values: string[];
  bestIndex?: number;
};

const columnHelper = createColumnHelper<MetricRow>();

function bestIndexForHigher(values: number[]) {
  const max = Math.max(...values);
  return values.findIndex((value) => value === max);
}

function bestIndexForLower(values: number[]) {
  const min = Math.min(...values);
  return values.findIndex((value) => value === min);
}

export function ComparisonTable({ colleges }: { colleges: CompareCollege[] }) {
  const rows: MetricRow[] = [
    {
      metric: "Location",
      values: colleges.map((college) => `${college.city}, ${college.state}`),
    },
    {
      metric: "Rating",
      values: colleges.map((college) => college.rating.toFixed(1)),
      bestIndex: bestIndexForHigher(colleges.map((college) => college.rating)),
    },
    {
      metric: "Fees (min)",
      values: colleges.map((college) => formatCurrency(college.feesMin)),
      bestIndex: bestIndexForLower(colleges.map((college) => college.feesMin)),
    },
    {
      metric: "Placement %",
      values: colleges.map((college) => formatPercent(college.placementPercent)),
      bestIndex: bestIndexForHigher(
        colleges.map((college) => college.placementPercent),
      ),
    },
    {
      metric: "Courses",
      values: colleges.map((college) => String(college.courses.length)),
      bestIndex: bestIndexForHigher(
        colleges.map((college) => college.courses.length),
      ),
    },
    {
      metric: "Top branches",
      values: colleges.map((college) =>
        college.courses
          .slice(0, 3)
          .map((course) => course.branch)
          .join(", "),
      ),
    },
  ];

  const columns = [
    columnHelper.accessor("metric", {
      header: "Metric",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    }),
    ...colleges.map((college, index) =>
      columnHelper.accessor((row) => row.values[index], {
        id: college.id,
        header: () => (
          <div className="max-w-[180px] text-left">
            <p className="line-clamp-2 font-semibold">{college.name}</p>
          </div>
        ),
        cell: (info) => {
          const row = info.row.original;
          const highlight = row.bestIndex === index;
          return (
            <span
              className={cn(
                highlight &&
                  "rounded-md bg-emerald-50 px-2 py-1 font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
              )}
            >
              {info.getValue()}
            </span>
          );
        },
      }),
    ),
  ];

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
        <thead className="sticky top-0 bg-slate-50 dark:bg-slate-900">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
