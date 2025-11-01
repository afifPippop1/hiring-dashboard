"use client";

import { getJobList } from "@/actions/job.action";
import { useQuery } from "@tanstack/react-query";

export function useJobs() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["job-list"],
    queryFn: getJobList,
  });

  return {
    data,
    error,
    isLoading,
  };
}
