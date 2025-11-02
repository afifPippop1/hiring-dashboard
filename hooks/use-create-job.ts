import { createJob } from "@/actions/job.action";
import { JobFormSchema } from "@/modules/jobs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateJob() {
  const createJobMutation = useMutation({
    mutationKey: ["create-job"],
    mutationFn: createJob,
  });
  const queryClient = useQueryClient();

  function createJobFn(formData: JobFormSchema) {
    return createJobMutation.mutateAsync(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["job-list"], exact: false });
      },
    });
  }

  return createJobFn;
}
