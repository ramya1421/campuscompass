import { PredictorForm } from "@/components/predictor/predictor-form";
import { PageHeader } from "@/components/shared/page-header";

export default function PredictorPage() {
  return (
    <div>
      <PageHeader
        title="AI College Predictor"
        description="Rule-based admission intelligence with polished recommendation cards and probability bands."
      />
      <PredictorForm />
    </div>
  );
}
