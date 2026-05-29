import { DashboardPanel } from "@/components/dashboard/dashboard-panel";
import { PageHeader } from "@/components/shared/page-header";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Track saved colleges, your discussions, and trending community activity."
      />
      <DashboardPanel />
    </div>
  );
}
