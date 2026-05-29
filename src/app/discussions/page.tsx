import { DiscussionsFeed } from "@/components/discussions/discussions-feed";
import { PageHeader } from "@/components/shared/page-header";

type Props = {
  searchParams: Promise<{ collegeId?: string }>;
};

export default async function DiscussionsPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div>
      <PageHeader
        title="Student Discussions"
        description="Reddit-style Q&A across placements, hostel, academics, campus life, and admissions."
      />
      <DiscussionsFeed collegeId={params.collegeId} />
    </div>
  );
}
