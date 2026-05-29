import { apiError, apiSuccess, getErrorMessage } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { commentSchema } from "@/lib/validations/discussion";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return apiError("Please sign in to comment", 401);
    }

    const { id } = await params;
    const discussion = await prisma.discussion.findUnique({ where: { id } });
    if (!discussion) {
      return apiError("Discussion not found", 404);
    }

    const body = await request.json();
    const parsed = commentSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Validation failed", 422, parsed.error.flatten());
    }

    const comment = await prisma.comment.create({
      data: {
        discussionId: id,
        userId: user.id,
        content: parsed.data.content,
        parentId: parsed.data.parentId,
      },
      include: {
        user: { select: { id: true, name: true, image: true } },
      },
    });

    return apiSuccess(comment, 201);
  } catch (error) {
    return apiError(getErrorMessage(error), 500);
  }
}
