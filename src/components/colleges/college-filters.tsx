"use client";

import { COURSE_TYPES, INDIAN_STATES, SORT_OPTIONS } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type CollegeFiltersState = {
  q: string;
  state: string;
  courseType: string;
  minFees: string;
  maxFees: string;
  minRating: string;
  sort: string;
};

type Props = {
  filters: CollegeFiltersState;
  onChange: (filters: CollegeFiltersState) => void;
};

export function CollegeFilters({ filters, onChange }: Props) {
  const update = (key: keyof CollegeFiltersState, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <Card className="h-fit lg:sticky lg:top-24">
      <CardHeader>
        <CardTitle className="text-base">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="College, city, state..."
            value={filters.q}
            onChange={(event) => update("q", event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>State</Label>
          <Select value={filters.state} onChange={(e) => update("state", e.target.value)}>
            <option value="">All states</option>
            {INDIAN_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Course type</Label>
          <Select
            value={filters.courseType}
            onChange={(e) => update("courseType", e.target.value)}
          >
            <option value="">All courses</option>
            {COURSE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Min fees</Label>
            <Input
              type="number"
              value={filters.minFees}
              onChange={(e) => update("minFees", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Max fees</Label>
            <Input
              type="number"
              value={filters.maxFees}
              onChange={(e) => update("maxFees", e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Minimum rating</Label>
          <Select
            value={filters.minRating}
            onChange={(e) => update("minRating", e.target.value)}
          >
            <option value="">Any</option>
            <option value="3">3.0+</option>
            <option value="4">4.0+</option>
            <option value="4.5">4.5+</option>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Sort by</Label>
          <Select value={filters.sort} onChange={(e) => update("sort", e.target.value)}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
