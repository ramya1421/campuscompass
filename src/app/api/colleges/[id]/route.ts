import { apiError, apiSuccess, getErrorMessage } from "@/lib/api";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { getCollegeById } from "@/services/college-service";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = await params;
    const college = await getCollegeById(id);

    if (!college) {
      return apiError("College not found", 404);
    }

    const user = await getCurrentUser();
    let isSaved = false;

    if (user?.id) {
      const saved = await prisma.savedCollege.findUnique({
        where: {
          userId_collegeId: {
            userId: user.id,
            collegeId: college.id,
          },
        },
      });
      isSaved = Boolean(saved);
    }

    return apiSuccess({ ...college, isSaved });
  } catch (error) {
    return apiError(getErrorMessage(error), 500);
  }
}
