"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiClient, type ApiResponse } from "@/lib/axios";
import { DISCUSSION_CATEGORIES } from "@/lib/constants";
import {
  discussionSchema,
  type DiscussionInput,
} from "@/lib/validations/discussion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CreateDiscussionForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DiscussionInput>({
    resolver: zodResolver(discussionSchema),
    defaultValues: {
      category: "ADMISSIONS",
    },
  });

  async function onSubmit(values: DiscussionInput) {
    try {
      const response = await apiClient.post<ApiResponse<{ id: string }>>(
        "/discussions",
        values,
      );
      const id = response.data.data?.id;
      toast.success("Discussion created");
      router.push(id ? `/discussions/${id}` : "/discussions");
    } catch {
      toast.error("Could not create discussion");
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Create a discussion</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
            {errors.title ? (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select id="category" {...register("category")}>
              {DISCUSSION_CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" rows={6} {...register("content")} />
            {errors.content ? (
              <p className="text-sm text-red-600">{errors.content.message}</p>
            ) : null}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Publishing..." : "Publish discussion"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
