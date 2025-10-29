"use client";

import { useJob } from "@/hooks/use-job";
import { useParams } from "next/navigation";
import { EmptyCandidates } from "./empty-candidates";

export default function JobDetail() {
  const params = useParams<{ jobId: string }>();
  const job = useJob(params.jobId);

  return (
    <div className="flex flex-col gap-6 h-full">
      <h1 className="text-xl font-bold">{job.data?.title}</h1>
      <EmptyCandidates />
    </div>
  );
}
