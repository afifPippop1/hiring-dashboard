"use client";

import { useJob } from "@/hooks/use-job";
import { Job, JOB_SEARCH_PARAM } from "@/modules/jobs";
import { useSearchParams } from "next/navigation";
import React from "react";

interface PublicJobContext {
  job: Job | null;
}

export const publiJobContext = React.createContext<PublicJobContext>({
  job: null,
});

export function PublicJobProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const externalId = searchParams.get(JOB_SEARCH_PARAM);
  const jobQuery = useJob(externalId ?? "");

  return (
    <publiJobContext.Provider value={{ job: jobQuery.data || null }}>
      {children}
    </publiJobContext.Provider>
  );
}
