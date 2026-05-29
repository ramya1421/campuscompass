import { z } from "zod";

export const discussionSchema = z.object({
  title: z.string().min(8, "Title must be at least 8 characters"),
  content: z.string().min(20, "Please add more context to your post"),
  category: z.enum([
    "PLACEMENTS",
    "HOSTEL",
    "ACADEMICS",
    "CAMPUS_LIFE",
    "ADMISSIONS",
  ]),
  collegeId: z.string().optional(),
});

export const commentSchema = z.object({
  content: z.string().min(2, "Comment cannot be empty"),
  parentId: z.string().optional(),
});

export type DiscussionInput = z.infer<typeof discussionSchema>;
export type CommentInput = z.infer<typeof commentSchema>;
