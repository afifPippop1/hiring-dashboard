"use client";
import { useJobs } from "@/hooks/use-jobs";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { EmptyJobOpening } from "./empty-job-opening";
import { JobOpeningCard } from "./job-opening-card";
import { JobOpeningDetail } from "./job-opening-detail";
import React from "react";

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

  if (!jobs.data?.length) return <EmptyJobOpening />;

  return (
    <div className=" md:px-0 flex md:flex-row flex-col gap-4 md:gap-5 w-full justify-center lg:justify-start">
      <div
        className={cn(
          "flex flex-col items-stretch gap-4 h-[calc(100dvh-144px)] overflow-y-auto",
          externalId && "hidden md:flex"
        )}
      >
        {jobs.data.map((job) => (
          <JobOpeningCard key={job.id} job={job} />
        ))}
      </div>
      <div className="px-4 md:px-0 flex flex-col w-full md:w-[719px] max-h-inherit rounded-lg border-none md:border border-neutral-4 scrollbar-transparent md:h-[calc(100dvh-144px)] md:overflow-y-auto lg:flex-1">
        <JobOpeningDetail />
      </div>
    </div>
  );
}
