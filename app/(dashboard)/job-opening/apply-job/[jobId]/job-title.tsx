"use client";

import { useJob } from "@/hooks/use-job";
import { useParams } from "next/navigation";

export function JobTitle() {
  const { jobId } = useParams<{ jobId: string }>();
  const job = useJob(jobId);

  if (!job.data) return <></>;

  return (
    <h1 className="font-bold text-xl text-neutral-100">
      Apply {job.data?.title} at Rakamin
    </h1>
  );
}
