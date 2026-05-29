"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import type { College, Course } from "@/generated/prisma/client";
import { apiClient, type ApiResponse } from "@/lib/axios";
import { useCompare } from "@/hooks/use-compare";
import { ComparisonTable } from "@/components/compare/comparison-table";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type CompareCollege = College & { courses: Course[] };

export function CompareWorkspace() {
  const { ids, clear } = useCompare();
  const [loading, setLoading] = useState(false);
  const [colleges, setColleges] = useState<CompareCollege[]>([]);

  useEffect(() => {
    async function load() {
      if (ids.length < 2) {
        setColleges([]);
        return;
      }

      setLoading(true);
      try {
        const response = await apiClient.get<ApiResponse<CompareCollege[]>>(
          `/compare?ids=${ids.join(",")}`,
        );
        if (!response.data.success || !response.data.data) {
          throw new Error(response.data.error ?? "Failed to compare");
        }
        setColleges(response.data.data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Compare failed");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [ids]);

  if (ids.length < 2) {
    return (
      <EmptyState
        title="Select colleges to compare"
        description="Add 2 to 3 colleges from listing or detail pages, then return here."
        action={
          <Link href="/colleges">
            <Button>Browse colleges</Button>
          </Link>
        }
      />
    );
  }

  if (loading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">Comparing {colleges.length} colleges</p>
        <Button variant="outline" onClick={clear}>
          Clear selection
        </Button>
      </div>
      <ComparisonTable colleges={colleges} />
    </div>
  );
}
