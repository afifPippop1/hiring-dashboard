import { getJobList } from "@/actions/job.action";
import { useQuery } from "@tanstack/react-query";

export function useJobs() {
  const { data, error } = useQuery({
    queryKey: ["job-list"],
    queryFn: getJobList,
  });

  return {
    data,
    error,
  };
}
