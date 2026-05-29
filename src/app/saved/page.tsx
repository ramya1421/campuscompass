import { SavedCollegesGrid } from "@/components/saved/saved-colleges-grid";
import { PageHeader } from "@/components/shared/page-header";

export default function SavedCollegesPage() {
  return (
    <div>
      <PageHeader
        title="Saved Colleges"
        description="Your personalized shortlist of colleges to revisit and compare."
      />
      <SavedCollegesGrid />
    </div>
  );
}
