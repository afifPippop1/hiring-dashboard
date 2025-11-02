"use client";
import { useJob } from "@/hooks/use-job";
import { Job } from "@/lib/job/job.schema";
import { useSearchParams } from "next/navigation";
import React from "react";

interface IJobOpeningContext {
  job: Job | null;
}

export const JobOpeningContext = React.createContext<IJobOpeningContext>({
  job: null,
});

export function JobOpeningProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const externalId = searchParams.get("external_id");
  const jobQuery = useJob(externalId ?? "");

  return (
    <JobOpeningContext.Provider value={{ job: jobQuery.data || null }}>
      {children}
    </JobOpeningContext.Provider>
  );
}

export function useJobOpening() {
  const ctx = React.useContext(JobOpeningContext);

  if (!ctx) {
    throw new Error(
      "useJobOpening must be used within a <JobOpeningProvider />"
    );
  }

  return ctx;
}
