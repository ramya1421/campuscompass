import { prisma } from "@/lib/prisma";
import type { PredictorInput } from "@/lib/validations/predictor";
import type { PredictorResult } from "@/types";

function probabilityFromScore(score: number): PredictorResult["probability"] {
  if (score >= 75) return "High";
  if (score >= 50) return "Medium";
  return "Reach";
}

export async function runPredictor(input: PredictorInput, userId?: string) {
  const colleges = await prisma.college.findMany({
    where: {
      courses: {
        some: {
          branch: { contains: input.branch.split(" ")[0], mode: "insensitive" },
        },
      },
      ...(input.preferredState ? { state: input.preferredState } : {}),
    },
    include: {
      courses: {
        where: {
          branch: { contains: input.branch.split(" ")[0], mode: "insensitive" },
        },
        orderBy: { cutoffRank: "asc" },
        take: 1,
      },
    },
    take: 80,
  });

  const recommendations: PredictorResult[] = colleges
    .map((college) => {
      const course = college.courses[0];
      const cutoff = course?.cutoffRank ?? 25000;
      const rankGap = input.rank - cutoff;
      let score = 55;

      if (rankGap <= 0) score += 30;
      else if (rankGap <= 2500) score += 18;
      else if (rankGap <= 7000) score += 8;
      else score -= 12;

      if (input.preferredState && college.state === input.preferredState) {
        score += 10;
      }

      if (college.placementPercent >= 85) score += 8;
      if (college.rating >= 4.5) score += 6;

      score = Math.max(20, Math.min(98, score));

      return {
        collegeId: college.id,
        name: college.name,
        slug: college.slug,
        state: college.state,
        city: college.city,
        matchScore: score,
        probability: probabilityFromScore(score),
        reason:
          rankGap <= 0
            ? "Your rank is within historical cutoff range for this branch."
            : "This is a stretch option based on cutoff trends and competition.",
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 8);

  await prisma.predictorHistory.create({
    data: {
      userId,
      exam: input.exam,
      rank: input.rank,
      preferredState: input.preferredState,
      branch: input.branch,
      results: recommendations,
    },
  });

  return recommendations;
}
