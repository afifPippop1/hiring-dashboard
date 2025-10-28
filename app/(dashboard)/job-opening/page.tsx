"use client";
import { useJobs } from "@/hooks/use-jobs";
import { EmptyJobOpening } from "./empty-job-opening";
import { JobOpeningCard } from "./job-opening-card";
import { JobOpeningProvider } from "./job-opening.provider";
import { JobOpeningDetail } from "./job-opening-detail";

export default function JobOpening() {
  const jobs = useJobs();

  if (!jobs.data?.length) return <EmptyJobOpening />;

  return (
    <JobOpeningProvider>
      <div className=" md:px-0 flex md:flex-row flex-col gap-4 md:gap-5 w-full justify-center lg:justify-start ">
        <div className="flex flex-col items-stretch overflow-auto">
          {jobs.data.map((job) => (
            <JobOpeningCard key={job.id} job={job} />
          ))}
        </div>
        <div className="px-4 md:px-0 flex flex-col w-full md:w-[719px] max-h-inherit rounded-lg border-none md:border border-neutral-4 scrollbar-transparent md:h-[calc(100dvh-144px)] md:overflow-y-auto">
          <JobOpeningDetail />
        </div>
      </div>
    </JobOpeningProvider>
  );
}
