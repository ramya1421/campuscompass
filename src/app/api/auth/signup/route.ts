import bcrypt from "bcryptjs";
import { apiError, apiSuccess, getErrorMessage } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return apiError("Validation failed", 422, parsed.error.flatten());
    }

    const existing = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (existing) {
      return apiError("An account with this email already exists", 409);
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);

    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return apiSuccess(user, 201);
  } catch (error) {
    return apiError(getErrorMessage(error), 500);
  }
}
