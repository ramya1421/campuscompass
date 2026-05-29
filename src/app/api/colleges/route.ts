import { apiError, apiSuccess, getErrorMessage } from "@/lib/api";
import { collegeQuerySchema } from "@/lib/validations/college";
import { listColleges } from "@/services/college-service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = collegeQuerySchema.safeParse(
      Object.fromEntries(searchParams.entries()),
    );

    if (!parsed.success) {
      return apiError("Invalid query parameters", 422, parsed.error.flatten());
    }

    const data = await listColleges(parsed.data);
    return apiSuccess(data);
  } catch (error) {
    return apiError(getErrorMessage(error), 500);
  }
}
