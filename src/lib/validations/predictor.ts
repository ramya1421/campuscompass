import { z } from "zod";

export const predictorSchema = z.object({
  exam: z.enum([
    "JEE_MAIN",
    "JEE_ADVANCED",
    "NEET",
    "CAT",
    "CUET",
    "STATE_CET",
  ]),
  rank: z
    .number({ error: "Rank must be a number" })
    .int("Rank must be a whole number")
    .positive("Rank must be a positive number"),
  preferredState: z.string().optional(),
  branch: z.string().min(2, "Branch is required"),
});

export const predictorApiSchema = predictorSchema.extend({
  rank: z.coerce
    .number()
    .int()
    .positive("Rank must be a positive number"),
});

export type PredictorInput = z.infer<typeof predictorSchema>;
