import { apiError, apiSuccess, getErrorMessage } from "@/lib/api";
import { getDiscussionDetail } from "@/services/discussion-service";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = await params;
    const discussion = await getDiscussionDetail(id);

    if (!discussion) {
      return apiError("Discussion not found", 404);
    }

    return apiSuccess(discussion);
  } catch (error) {
    return apiError(getErrorMessage(error), 500);
  }
}
