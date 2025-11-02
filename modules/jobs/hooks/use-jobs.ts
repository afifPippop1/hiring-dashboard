"use client";

import { getJobList } from "@/actions/job.action";
import { useQuery } from "@tanstack/react-query";

export function useJobs({ query }: { query?: string } = { query: "" }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["job-list", query],
    queryFn: () => getJobList({ query }),
  });

  return {
    data,
    error,
    isLoading,
  };
}
