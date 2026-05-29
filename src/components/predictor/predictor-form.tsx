"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Sparkles } from "lucide-react";
import { apiClient, type ApiResponse } from "@/lib/axios";
import { EXAM_OPTIONS, INDIAN_STATES } from "@/lib/constants";
import {
  predictorSchema,
  type PredictorInput,
} from "@/lib/validations/predictor";
import type { PredictorResult } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export function PredictorForm() {
  const [results, setResults] = useState<PredictorResult[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PredictorInput>({
    resolver: zodResolver(predictorSchema),
    defaultValues: {
      exam: "JEE_MAIN",
      branch: "Computer Science",
      rank: 10000,
    },
  });

  async function onSubmit(values: PredictorInput) {
    try {
      const response = await apiClient.post<ApiResponse<PredictorResult[]>>(
        "/predictor",
        values,
      );
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error ?? "Prediction failed");
      }
      setResults(response.data.data);
      toast.success("Recommendations generated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Prediction failed");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            AI College Predictor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Exam</Label>
              <Select {...register("exam")}>
                {EXAM_OPTIONS.map((exam) => (
                  <option key={exam.value} value={exam.value}>
                    {exam.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Rank</Label>
              <Input type="number" {...register("rank", { valueAsNumber: true })} />
              {errors.rank ? (
                <p className="text-sm text-red-600">{errors.rank.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label>Preferred state</Label>
              <Select {...register("preferredState")}>
                <option value="">Any state</option>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Branch</Label>
              <Input {...register("branch")} />
              {errors.branch ? (
                <p className="text-sm text-red-600">{errors.branch.message}</p>
              ) : null}
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Analyzing profile..." : "Predict colleges"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {results.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-8 text-sm text-slate-500">
              Enter your exam profile to get ranked college recommendations with
              probability bands and reasoning.
            </CardContent>
          </Card>
        ) : (
          results.map((result) => (
            <Card key={result.collegeId}>
              <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{result.name}</p>
                  <p className="text-sm text-slate-500">
                    {result.city}, {result.state}
                  </p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{result.reason}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      result.probability === "High"
                        ? "success"
                        : result.probability === "Medium"
                          ? "warning"
                          : "secondary"
                    }
                  >
                    {result.probability}
                  </Badge>
                  <Badge>{result.matchScore}% match</Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
