import { notFound } from "next/navigation";
import { CollegeDetailView } from "@/components/colleges/college-detail-view";
import { getCollegeById } from "@/services/college-service";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function CollegeDetailPage({ params }: Props) {
  const { id } = await params;
  const college = await getCollegeById(id);

  if (!college) {
    notFound();
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

  return <CollegeDetailView college={{ ...college, isSaved }} />;
}
