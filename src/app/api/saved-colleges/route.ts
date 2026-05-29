import { apiError, apiSuccess, getErrorMessage } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return apiError("Unauthorized", 401);
    }

    const saved = await prisma.savedCollege.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        college: {
          select: {
            id: true,
            slug: true,
            name: true,
            city: true,
            state: true,
            imageUrl: true,
            rating: true,
            feesMin: true,
            feesMax: true,
            placementPercent: true,
            type: true,
          },
        },
      },
    });

    return apiSuccess(saved.map((item) => item.college));
  } catch (error) {
    return apiError(getErrorMessage(error), 500);
  }
}
