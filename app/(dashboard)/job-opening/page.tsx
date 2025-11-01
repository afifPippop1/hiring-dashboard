"use client";
import { Spinner } from "@/components/ui/spinner";
import { useJobs } from "@/hooks/use-jobs";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { EmptyJobOpening } from "./empty-job-opening";
import { JobOpeningCard } from "./job-opening-card";
import { JobOpeningDetail } from "./job-opening-detail";

export default function JobOpening() {
  const searchParams = useSearchParams();
  const externalId = searchParams.get("external_id");
  const jobs = useJobs();
  const router = useRouter();

  React.useEffect(() => {
    if (jobs.data?.length && !externalId) {
      const firstJob = jobs.data[0];

      const currentParams = new URLSearchParams(searchParams);
      currentParams.set("external_id", firstJob.id);

      router.push(`?${currentParams.toString()}`);
    }
  }, [externalId, jobs.data, router, searchParams]);

  if (!jobs.data?.length && !jobs.isLoading) return <EmptyJobOpening />;

  if (jobs.isLoading)
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner className="size-20 text-primary" />
      </div>
    );

  return (
    <div className=" md:px-0 flex md:flex-row flex-col gap-4 md:gap-5 w-full justify-center lg:justify-start">
      <div
        className={cn(
          "flex flex-col items-stretch gap-4 h-[calc(100dvh-144px)] overflow-y-auto md:pr-4",
          externalId && "hidden md:flex"
        )}
      >
        {jobs.data?.map((job) => (
          <Suspense key={job.id}>
            <JobOpeningCard job={job} />
          </Suspense>
        ))}
      </div>
      <div className="px-4 md:px-0 flex flex-col w-full md:w-[719px] max-h-inherit rounded-lg border-none md:border border-neutral-4 scrollbar-transparent md:h-[calc(100dvh-144px)] md:overflow-y-auto lg:flex-1">
        <JobOpeningDetail />
      </div>
    </div>
  );
}
