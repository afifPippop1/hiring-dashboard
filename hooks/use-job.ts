import { getJob } from "@/actions/job.action";
import { useQuery } from "@tanstack/react-query";

export function useJob(id: string) {
  const jobQuery = useQuery({
    queryKey: ["job", id],
    queryFn: () => getJob(id),
  });

  return jobQuery;
}
