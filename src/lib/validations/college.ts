import { z } from "zod";

export const collegeQuerySchema = z.object({
  q: z.string().optional(),
  state: z.string().optional(),
  courseType: z.string().optional(),
  minFees: z.coerce.number().optional(),
  maxFees: z.coerce.number().optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  sort: z.enum(["rating", "fees", "placement"]).default("rating"),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(12),
});

export type CollegeQueryInput = z.infer<typeof collegeQuerySchema>;
