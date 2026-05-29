"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { apiClient, type ApiResponse } from "@/lib/axios";
import type { CollegeListItem } from "@/types";
import { CollegeCard } from "@/components/colleges/college-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function SavedCollegesGrid() {
  const [loading, setLoading] = useState(true);
  const [colleges, setColleges] = useState<CollegeListItem[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const response = await apiClient.get<ApiResponse<CollegeListItem[]>>(
          "/saved-colleges",
        );
        if (!response.data.success || !response.data.data) {
          throw new Error(response.data.error ?? "Failed to load");
        }
        setColleges(response.data.data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-80" />
        ))}
      </div>
    );
  }

  if (!colleges.length) {
    return (
      <EmptyState
        title="No saved colleges"
        description="Bookmark colleges while exploring to build your shortlist."
        action={
          <Link href="/colleges">
            <Button>Explore colleges</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {colleges.map((college) => (
        <CollegeCard key={college.id} college={college} />
      ))}
    </div>
  );
}
