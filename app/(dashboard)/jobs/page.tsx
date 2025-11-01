"use client";

import { useJobs } from "@/hooks/use-jobs";
import { EmptyJobList } from "./empty-job-list";
import { JobCard, JobCardSkeleton } from "./job-card";
import { CreateJobCard } from "./create-job-card";

export default function Jobspage() {
  const jobs = useJobs();

  if (!jobs.data?.length && !jobs.isLoading) return <EmptyJobList />;

  return (
    <div className="flex items-start gap-6">
      <div className="flex-1 flex flex-col items-stretch gap-4">
        {jobs.isLoading && [1, 2, 3].map((i) => <JobCardSkeleton key={i} />)}
        {jobs.data?.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <div className="sticky top-0 self-start">
        <CreateJobCard />
      </div>
    </div>
  );
}
