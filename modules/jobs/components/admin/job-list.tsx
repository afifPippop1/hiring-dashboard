"use client";

import { useAdminJobList } from "@/modules/jobs";
import { EmptyJobList } from "./empty-job-list";
import { JobCard, JobCardSkeleton } from "./job-card";

export function JobList() {
  const { jobs, isLoading } = useAdminJobList();
  if (isLoading) {
    return [1, 2, 3].map((i) => <JobCardSkeleton key={i} />);
  } else if (!jobs?.length) {
    return <EmptyJobList />;
  }

  return jobs?.map((job) => <JobCard key={job.id} job={job} />);
}
