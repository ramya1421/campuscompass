import { apiError, apiSuccess, getErrorMessage } from "@/lib/api";
import { getCurrentUser } from "@/lib/session";
import { predictorApiSchema } from "@/lib/validations/predictor";
import { runPredictor } from "@/services/predictor-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = predictorApiSchema.safeParse(body);

    if (!parsed.success) {
      return apiError("Validation failed", 422, parsed.error.flatten());
    }

    const user = await getCurrentUser();
    const recommendations = await runPredictor(parsed.data, user?.id);

    return apiSuccess(recommendations);
  } catch (error) {
    return apiError(getErrorMessage(error), 500);
  }
}
