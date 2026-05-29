"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function toggleSavedCollege(collegeId: string) {
  const user = await getCurrentUser();
  if (!user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  const existing = await prisma.savedCollege.findUnique({
    where: {
      userId_collegeId: {
        userId: user.id,
        collegeId,
      },
    },
  });

  if (existing) {
    await prisma.savedCollege.delete({ where: { id: existing.id } });
    revalidatePath("/saved");
    revalidatePath(`/college/${collegeId}`);
    return { saved: false };
  }

  await prisma.savedCollege.create({
    data: {
      userId: user.id,
      collegeId,
    },
  });

  revalidatePath("/saved");
  revalidatePath(`/college/${collegeId}`);
  return { saved: true };
}
