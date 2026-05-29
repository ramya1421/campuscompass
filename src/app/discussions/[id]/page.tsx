import { notFound } from "next/navigation";
import { DiscussionDetailClient } from "@/components/discussions/discussion-detail-client";
import { getDiscussionDetail } from "@/services/discussion-service";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function DiscussionDetailPage({ params }: Props) {
  const { id } = await params;
  const discussion = await getDiscussionDetail(id);

  if (!discussion) {
    notFound();
  }

  return (
    <DiscussionDetailClient
      initial={{
        ...discussion,
        createdAt: discussion.createdAt.toISOString(),
      }}
    />
  );
}
