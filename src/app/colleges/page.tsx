import { CollegesExplorer } from "@/components/colleges/colleges-explorer";
import { PageHeader } from "@/components/shared/page-header";

export default function CollegesPage() {
  return (
    <div>
      <PageHeader
        title="Explore Colleges"
        description="Search and filter premium college listings with server-side pagination and sorting."
      />
      <CollegesExplorer />
    </div>
  );
}
