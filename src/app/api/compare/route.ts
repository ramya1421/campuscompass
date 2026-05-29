import { z } from "zod";
import { apiError, apiSuccess, getErrorMessage } from "@/lib/api";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { getCollegesByIds } from "@/services/college-service";

const compareSchema = z.object({
  collegeIds: z.array(z.string()).min(2).max(3),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get("ids")?.split(",").filter(Boolean) ?? [];

    const parsed = compareSchema.safeParse({ collegeIds: ids });
    if (!parsed.success) {
      return apiError("Select 2 to 3 colleges to compare", 422);
    }

    const colleges = await getCollegesByIds(parsed.data.collegeIds);
    if (colleges.length < 2) {
      return apiError("Could not find enough colleges to compare", 404);
    }

    return apiSuccess(colleges);
  } catch (error) {
    return apiError(getErrorMessage(error), 500);
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return apiError("Please sign in to save comparisons", 401);
    }

    const body = await request.json();
    const parsed = compareSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Select 2 to 3 colleges", 422);
    }

    const comparison = await prisma.comparison.create({
      data: {
        userId: user.id,
        collegeIds: parsed.data.collegeIds,
      },
    });

    return apiSuccess(comparison, 201);
  } catch (error) {
    return apiError(getErrorMessage(error), 500);
  }
}
