import Link from "next/link";
import {
  ArrowRight,
  GitCompare,
  GraduationCap,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let stats = { colleges: 50, discussions: 30, states: 18 };
  try {
    const [colleges, discussions] = await Promise.all([
      prisma.college.count(),
      prisma.discussion.count(),
    ]);
    stats = { colleges, discussions, states: 18 };
  } catch {
    // Database may be unavailable during initial setup.
  }

  return (
    <div className="space-y-16">
      <section className="glass-panel relative overflow-hidden rounded-3xl px-6 py-14 sm:px-10">
        <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <Sparkles className="h-3.5 w-3.5" />
            Production-ready college discovery platform
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Find your ideal college with confidence.
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            CampusCompass combines premium college discovery, side-by-side comparison,
            student discussions, and AI admission predictions in one modern platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/colleges">
              <Button size="lg">
                Explore colleges <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/predictor">
              <Button size="lg" variant="outline">
                Try AI predictor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Colleges indexed", value: stats.colleges },
          { label: "Active discussions", value: stats.discussions },
          { label: "States covered", value: stats.states },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-6">
              <p className="text-3xl font-bold">{item.value}+</p>
              <p className="mt-1 text-sm text-slate-500">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "College Discovery",
            description: "Search, filter, and sort 50+ Indian institutions with rich profiles.",
            icon: GraduationCap,
            href: "/colleges",
          },
          {
            title: "Discussions",
            description: "Ask seniors about placements, hostel life, academics, and admissions.",
            icon: MessageSquare,
            href: "/discussions",
          },
          {
            title: "Smart Compare",
            description: "Compare up to 3 colleges across fees, placements, ratings, and courses.",
            icon: GitCompare,
            href: "/compare",
          },
        ].map((feature) => (
          <Card key={feature.title} className="transition hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="space-y-4 p-6">
              <feature.icon className="h-8 w-8 text-blue-600" />
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
              <Link href={feature.href} className="text-sm font-medium text-blue-600">
                Open feature →
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
