"use client";

import { useJobs } from "@/hooks/use-jobs";
import { EmptyJobList } from "./empty-job-list";
import { JobCard } from "./job-card";
import { CreateJobCard } from "./create-job-card";

export default function Jobspage() {
  const jobs = useJobs();
  if (!jobs.data?.length) return <EmptyJobList />;

  return (
    <div className="flex items-start overflow-auto gap-6">
      <div className="flex-1 flex flex-col items-stretch gap-4">
        {jobs.data.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <CreateJobCard />
    </div>
  );
}
