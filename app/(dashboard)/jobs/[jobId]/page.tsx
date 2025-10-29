"use client";

import { ApplicationsTable } from "@/components/shared/applications-table";
import { useApplication } from "@/hooks/use-application";
import { useJob } from "@/hooks/use-job";
import { useParams } from "next/navigation";
import { EmptyCandidates } from "./empty-candidates";

export default function JobDetail() {
  const params = useParams<{ jobId: string }>();
  const job = useJob(params.jobId);
  const application = useApplication(params.jobId);

  return (
    <div className="flex flex-col gap-6 h-full">
      <h1 className="text-xl font-bold">{job.data?.title}</h1>

      <div className="flex flex-col h-full rounded-md border border-neutral-40 shadow-[#0000001A] p-6 bg-neutral-10">
        {!application.data || application.data.length === 0 ? (
          <EmptyCandidates />
        ) : (
          <ApplicationsTable candidates={application.data} />
        )}
      </div>
    </div>
  );
}
