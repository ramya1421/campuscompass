import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, TrendingUp } from "lucide-react";
import type { CollegeListItem } from "@/types";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CollegeCard({ college }: { college: CollegeListItem }) {
  return (
    <Card className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={college.imageUrl}
          alt={college.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
        <Badge className="absolute left-4 top-4">{college.type}</Badge>
      </div>
      <CardHeader className="space-y-2">
        <CardTitle className="line-clamp-2 text-base leading-snug">
          <Link href={`/college/${college.slug}`} className="hover:text-blue-600">
            {college.name}
          </Link>
        </CardTitle>
        <p className="flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="h-3.5 w-3.5" />
          {college.city}, {college.state}
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-3 text-sm">
        <div>
          <p className="text-slate-500">Rating</p>
          <p className="flex items-center gap-1 font-semibold">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {college.rating.toFixed(1)}
          </p>
        </div>
        <div>
          <p className="text-slate-500">Fees</p>
          <p className="font-semibold">{formatCurrency(college.feesMin)}</p>
        </div>
        <div>
          <p className="text-slate-500">Placement</p>
          <p className="flex items-center gap-1 font-semibold text-emerald-600">
            <TrendingUp className="h-3.5 w-3.5" />
            {formatPercent(college.placementPercent)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
