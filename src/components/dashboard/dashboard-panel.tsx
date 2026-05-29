"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { apiClient, type ApiResponse } from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type DashboardData = {
  stats: {
    savedCount: number;
    discussionsCount: number;
    comparisonsCount: number;
  };
  topColleges: Array<{
    id: string;
    slug: string;
    name: string;
    state: string;
    rating: number;
    placementPercent: number;
  }>;
  trendingDiscussions: Array<{
    id: string;
    title: string;
    likesCount: number;
    user: { name: string | null };
    college: { name: string } | null;
  }>;
};

export function DashboardPanel() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await apiClient.get<ApiResponse<DashboardData>>("/dashboard");
        if (!response.data.success || !response.data.data) {
          throw new Error(response.data.error ?? "Failed to load dashboard");
        }
        setData(response.data.data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Dashboard error");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Saved colleges", value: data.stats.savedCount },
          { label: "Your discussions", value: data.stats.discussionsCount },
          { label: "Comparisons", value: data.stats.comparisonsCount },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-1 text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top rated colleges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.topColleges.map((college) => (
              <Link
                key={college.id}
                href={`/college/${college.slug}`}
                className="flex items-center justify-between rounded-lg border border-slate-200 p-3 text-sm hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
              >
                <span className="font-medium">{college.name}</span>
                <span className="text-slate-500">{college.rating.toFixed(1)} ★</span>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trending discussions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.trendingDiscussions.map((discussion) => (
              <Link
                key={discussion.id}
                href={`/discussions/${discussion.id}`}
                className="block rounded-lg border border-slate-200 p-3 text-sm hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
              >
                <p className="font-medium">{discussion.title}</p>
                <p className="mt-1 text-slate-500">
                  {discussion.likesCount} likes • {discussion.user.name}
                </p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
