"use client";

import { getApplicationsAction } from "@/actions/application.action";
import { useQuery } from "@tanstack/react-query";

export function useApplication(jobId: string) {
  const query = useQuery({
    queryKey: ["application", jobId],
    queryFn: () => getApplicationsAction(jobId),
  });

  return { data: query.data?.data, error: query.error };
}
