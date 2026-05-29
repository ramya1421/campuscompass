"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import toast from "react-hot-toast";
import { Bookmark, GitCompare, MapPin, Star } from "lucide-react";
import type { CollegeDetail } from "@/types";
import { apiClient } from "@/lib/axios";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { useCompare } from "@/hooks/use-compare";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CollegeWithSaved = CollegeDetail & { isSaved?: boolean };

export function CollegeDetailView({ college }: { college: CollegeWithSaved }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { toggle, ids } = useCompare();
  const [saved, setSaved] = React.useState(Boolean(college.isSaved));

  const trend = (college.placementTrend as Array<{ year: number; percent: number }>) ?? [];

  async function handleSave() {
    if (!session?.user) {
      toast.error("Please login to save colleges");
      router.push("/login");
      return;
    }

    try {
      if (saved) {
        await apiClient.delete(`/colleges/${college.id}/save`);
        setSaved(false);
        toast.success("Removed from saved colleges");
      } else {
        await apiClient.post(`/colleges/${college.id}/save`);
        setSaved(true);
        toast.success("College saved");
      }
    } catch {
      toast.error("Could not update saved status");
    }
  }

  function handleCompare() {
    toggle(college.id);
    toast.success(
      ids.includes(college.id)
        ? "Removed from comparison"
        : "Added to comparison (max 3)",
    );
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="relative h-56 w-full sm:h-72">
          <Image src={college.imageUrl} alt={college.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/50 to-transparent" />
          <div className="absolute bottom-0 p-6 sm:p-8">
            <Badge className="mb-3">{college.type}</Badge>
            <h1 className="max-w-3xl text-2xl font-bold text-white sm:text-4xl">{college.name}</h1>
            <p className="mt-2 flex items-center gap-2 text-slate-200">
              <MapPin className="h-4 w-4" />
              {college.city}, {college.state}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 p-4 dark:border-slate-800">
          <Button onClick={handleSave} variant={saved ? "secondary" : "default"}>
            <Bookmark className="h-4 w-4" />
            {saved ? "Saved" : "Save college"}
          </Button>
          <Button variant="outline" onClick={handleCompare}>
            <GitCompare className="h-4 w-4" />
            {ids.includes(college.id) ? "In compare" : "Add to compare"}
          </Button>
          <Link href="/compare">
            <Button variant="ghost">Open comparison</Button>
          </Link>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Rating", value: college.rating.toFixed(1), icon: Star },
          { label: "Placement", value: formatPercent(college.placementPercent) },
          { label: "Avg package", value: `${college.avgPackage?.toFixed(1)} LPA` },
          { label: "Fees range", value: `${formatCurrency(college.feesMin)} - ${formatCurrency(college.feesMax)}` },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="placements">Placements</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>{college.overview}</p>
              <p>{college.description}</p>
              <p>{college.admissionInfo}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <div className="grid gap-4 md:grid-cols-2">
            {college.courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle className="text-base">{course.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  <p>Branch: {course.branch}</p>
                  <p>Degree: {course.degree}</p>
                  <p>Duration: {course.duration}</p>
                  <p>Fees: {formatCurrency(course.fees)}</p>
                  <p>Cutoff rank: {course.cutoffRank ?? "N/A"}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="placements">
          <Card>
            <CardHeader>
              <CardTitle>Placement trend</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="percent" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees">
          <Card>
            <CardContent className="space-y-3 p-6 text-slate-600 dark:text-slate-300">
              <p>Annual fees range: {formatCurrency(college.feesMin)} - {formatCurrency(college.feesMax)}</p>
              <p>Highest package: {college.highestPackage?.toFixed(1)} LPA</p>
              <p>Hostel: {college.hostelInfo}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="space-y-4">
            {college.reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <CardTitle className="text-base">{review.title}</CardTitle>
                  <p className="text-sm text-slate-500">
                    {review.user.name} • {review.rating}/5
                  </p>
                </CardHeader>
                <CardContent className="text-slate-600 dark:text-slate-300">
                  {review.content}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="facilities">
          <div className="flex flex-wrap gap-2">
            {college.facilities.map((facility) => (
              <Badge key={facility} variant="secondary">
                {facility}
              </Badge>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="discussions">
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="font-medium">Join the conversation</p>
                <p className="text-sm text-slate-500">
                  {college._count.discussions} active threads for this college
                </p>
              </div>
              <Link href={`/discussions?collegeId=${college.id}`}>
                <Button>View discussions</Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
