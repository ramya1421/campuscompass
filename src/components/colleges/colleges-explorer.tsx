"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiClient, type ApiResponse } from "@/lib/axios";
import { useDebounce } from "@/hooks/use-debounce";
import type { CollegeListItem, Paginated } from "@/types";
import { CollegeCard } from "@/components/colleges/college-card";
import {
  CollegeFilters,
  type CollegeFiltersState,
} from "@/components/colleges/college-filters";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const defaultFilters: CollegeFiltersState = {
  q: "",
  state: "",
  courseType: "",
  minFees: "",
  maxFees: "",
  minRating: "",
  sort: "rating",
};

export function CollegesExplorer() {
  const [filters, setFilters] = useState<CollegeFiltersState>(defaultFilters);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Paginated<CollegeListItem> | null>(null);
  const debouncedQuery = useDebounce(filters.q, 400);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, filters.state, filters.courseType, filters.minFees, filters.maxFees, filters.minRating, filters.sort]);

  useEffect(() => {
    async function fetchColleges() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: "12",
          sort: filters.sort,
        });

        if (debouncedQuery) params.set("q", debouncedQuery);
        if (filters.state) params.set("state", filters.state);
        if (filters.courseType) params.set("courseType", filters.courseType);
        if (filters.minFees) params.set("minFees", filters.minFees);
        if (filters.maxFees) params.set("maxFees", filters.maxFees);
        if (filters.minRating) params.set("minRating", filters.minRating);

        const response = await apiClient.get<ApiResponse<Paginated<CollegeListItem>>>(
          `/colleges?${params.toString()}`,
        );

        if (!response.data.success || !response.data.data) {
          throw new Error(response.data.error ?? "Failed to load colleges");
        }

        setData(response.data.data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load colleges");
      } finally {
        setLoading(false);
      }
    }

    fetchColleges();
  }, [debouncedQuery, filters, page]);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <CollegeFilters filters={filters} onChange={setFilters} />

      <div>
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-80 w-full" />
            ))}
          </div>
        ) : !data?.items.length ? (
          <EmptyState
            title="No colleges found"
            description="Try adjusting your filters or search keywords."
          />
        ) : (
          <>
            <div className="mb-4 text-sm text-slate-500">
              Showing {data.items.length} of {data.total} colleges
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {data.items.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage((value) => value - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-slate-600">
                Page {data.page} of {data.totalPages}
              </span>
              <Button
                variant="outline"
                disabled={page >= data.totalPages}
                onClick={() => setPage((value) => value + 1)}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
