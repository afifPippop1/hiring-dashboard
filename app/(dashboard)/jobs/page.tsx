"use client";

import { useJobs } from "@/hooks/use-jobs";
import { EmptyJobList } from "./empty-job-list";
import { JobCard } from "./job-card";

export default function Jobspage() {
  const jobs = useJobs();
  if (!jobs.data?.length) return <EmptyJobList />;

  return (
    <div className="flex flex-col items-stretch">
      {jobs.data.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
