import { CompareWorkspace } from "@/components/compare/compare-workspace";
import { PageHeader } from "@/components/shared/page-header";

export default function ComparePage() {
  return (
    <div>
      <PageHeader
        title="Compare Colleges"
        description="Side-by-side comparison with highlighted winners across key metrics."
      />
      <CompareWorkspace />
    </div>
  );
}
