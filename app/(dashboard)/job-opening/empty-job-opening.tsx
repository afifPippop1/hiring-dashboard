import { EmptyState } from "@/components/shared/empty-state";
import { EMPTY_JOB_ASSET } from "@/lib/assets";

export function EmptyJobOpening() {
  return (
    <EmptyState
      src={EMPTY_JOB_ASSET}
      title="No job openings available"
      description="Please wait for the next batch of openings."
    />
  );
}
