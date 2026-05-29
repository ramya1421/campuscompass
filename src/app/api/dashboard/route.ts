import { apiError, apiSuccess, getErrorMessage } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return apiError("Unauthorized", 401);
    }

    const [
      savedCount,
      discussionsCount,
      comparisonsCount,
      topColleges,
      trendingDiscussions,
    ] = await Promise.all([
      prisma.savedCollege.count({ where: { userId: user.id } }),
      prisma.discussion.count({ where: { userId: user.id } }),
      prisma.comparison.count({ where: { userId: user.id } }),
      prisma.college.findMany({
        orderBy: { rating: "desc" },
        take: 5,
        select: {
          id: true,
          slug: true,
          name: true,
          state: true,
          rating: true,
          placementPercent: true,
        },
      }),
      prisma.discussion.findMany({
        orderBy: { likesCount: "desc" },
        take: 5,
        include: {
          user: { select: { id: true, name: true } },
          college: { select: { id: true, name: true } },
        },
      }),
    ]);

    return apiSuccess({
      stats: {
        savedCount,
        discussionsCount,
        comparisonsCount,
      },
      topColleges,
      trendingDiscussions,
    });
  } catch (error) {
    return apiError(getErrorMessage(error), 500);
  }
}
