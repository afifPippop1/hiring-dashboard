import { getJob } from "@/actions/job.action";
import { ApplicationFormField } from "@/modules/applications";
import { JobMapper } from "@/modules/jobs";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export function useJob(id: string) {
  const jobQuery = useQuery({
    queryKey: ["job", id],
    queryFn: () => getJob(id),
  });
  const normalizedData = React.useMemo(() => {
    return jobQuery.data ? JobMapper.fromSupabase(jobQuery.data) : null;
  }, [jobQuery.data]);

  const applicationFormArray = React.useMemo(() => {
    return jobQuery.data?.applications_form.map(
      (app) => app as ApplicationFormField
    );
  }, [jobQuery.data?.applications_form]);

  return { ...jobQuery, data: normalizedData, applicationFormArray };
}
