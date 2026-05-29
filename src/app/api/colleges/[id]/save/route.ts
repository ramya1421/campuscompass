import { apiError, apiSuccess, getErrorMessage } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { getCollegeById } from "@/services/college-service";

type Params = { params: Promise<{ id: string }> };

export async function POST(_: Request, { params }: Params) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return apiError("Please sign in to save colleges", 401);
    }

    const { id } = await params;
    const college = await getCollegeById(id);
    if (!college) {
      return apiError("College not found", 404);
    }

    await prisma.savedCollege.upsert({
      where: {
        userId_collegeId: {
          userId: user.id,
          collegeId: college.id,
        },
      },
      update: {},
      create: {
        userId: user.id,
        collegeId: college.id,
      },
    });

    return apiSuccess({ saved: true });
  } catch (error) {
    return apiError(getErrorMessage(error), 500);
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return apiError("Please sign in to manage saved colleges", 401);
    }

    const { id } = await params;
    const college = await getCollegeById(id);
    if (!college) {
      return apiError("College not found", 404);
    }

    await prisma.savedCollege.deleteMany({
      where: { userId: user.id, collegeId: college.id },
    });

    return apiSuccess({ saved: false });
  } catch (error) {
    return apiError(getErrorMessage(error), 500);
  }
}
