import { apiError, apiSuccess, getErrorMessage } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { discussionSchema } from "@/lib/validations/discussion";
import { listDiscussions } from "@/services/discussion-service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const data = await listDiscussions({
      q: searchParams.get("q") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      collegeId: searchParams.get("collegeId") ?? undefined,
      page: Number(searchParams.get("page") ?? 1),
      limit: Number(searchParams.get("limit") ?? 10),
    });

    return apiSuccess(data);
  } catch (error) {
    return apiError(getErrorMessage(error), 500);
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return apiError("Please sign in to create discussions", 401);
    }

    const body = await request.json();
    const parsed = discussionSchema.safeParse(body);

    if (!parsed.success) {
      return apiError("Validation failed", 422, parsed.error.flatten());
    }

    const discussion = await prisma.discussion.create({
      data: {
        title: parsed.data.title,
        content: parsed.data.content,
        category: parsed.data.category,
        collegeId: parsed.data.collegeId,
        userId: user.id,
      },
      include: {
        user: { select: { id: true, name: true, image: true } },
        college: { select: { id: true, name: true, slug: true } },
      },
    });

    return apiSuccess(discussion, 201);
  } catch (error) {
    return apiError(getErrorMessage(error), 500);
  }
}
