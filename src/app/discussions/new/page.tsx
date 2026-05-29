import { CreateDiscussionForm } from "@/components/discussions/create-discussion-form";
import { PageHeader } from "@/components/shared/page-header";

export default function NewDiscussionPage() {
  return (
    <div>
      <PageHeader
        title="Start a discussion"
        description="Ask questions and share experiences with the community."
      />
      <CreateDiscussionForm />
    </div>
  );
}
