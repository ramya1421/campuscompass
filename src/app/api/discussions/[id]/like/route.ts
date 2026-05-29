import { apiError, apiSuccess, getErrorMessage } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

type Params = { params: Promise<{ id: string }> };

export async function POST(_: Request, { params }: Params) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return apiError("Please sign in to like discussions", 401);
    }

    const { id } = await params;
    const discussion = await prisma.discussion.findUnique({ where: { id } });
    if (!discussion) {
      return apiError("Discussion not found", 404);
    }

    const existing = await prisma.discussionLike.findUnique({
      where: {
        discussionId_userId: {
          discussionId: id,
          userId: user.id,
        },
      },
    });

    if (existing) {
      await prisma.$transaction([
        prisma.discussionLike.delete({ where: { id: existing.id } }),
        prisma.discussion.update({
          where: { id },
          data: { likesCount: { decrement: 1 } },
        }),
      ]);
      return apiSuccess({ liked: false });
    }

    await prisma.$transaction([
      prisma.discussionLike.create({
        data: { discussionId: id, userId: user.id },
      }),
      prisma.discussion.update({
        where: { id },
        data: { likesCount: { increment: 1 } },
      }),
    ]);

    return apiSuccess({ liked: true });
  } catch (error) {
    return apiError(getErrorMessage(error), 500);
  }
}
