"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { apiClient, type ApiResponse } from "@/lib/axios";
import { DISCUSSION_CATEGORIES } from "@/lib/constants";
import type { DiscussionWithMeta, Paginated } from "@/types";
import { DiscussionCard } from "@/components/discussions/discussion-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export function DiscussionsFeed({ collegeId }: { collegeId?: string }) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Paginated<DiscussionWithMeta> | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (category) params.set("category", category);
        if (collegeId) params.set("collegeId", collegeId);

        const response = await apiClient.get<ApiResponse<Paginated<DiscussionWithMeta>>>(
          `/discussions?${params.toString()}`,
        );

        if (!response.data.success || !response.data.data) {
          throw new Error(response.data.error ?? "Failed to load discussions");
        }

        setData(response.data.data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(load, 300);
    return () => clearTimeout(timer);
  }, [q, category, collegeId]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-3">
          <Input
            placeholder="Search discussions..."
            value={q}
            onChange={(event) => setQ(event.target.value)}
          />
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All categories</option>
            {DISCUSSION_CATEGORIES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </div>
        <Link href="/discussions/new">
          <Button>Create post</Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-40 w-full" />
          ))}
        </div>
      ) : !data?.items.length ? (
        <EmptyState
          title="No discussions yet"
          description="Start the first conversation and help other students."
          action={
            <Link href="/discussions/new">
              <Button>Create discussion</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {data.items.map((discussion) => (
            <DiscussionCard key={discussion.id} discussion={discussion} />
          ))}
        </div>
      )}
    </div>
  );
}
