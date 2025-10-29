"use client";
import { getQueryClient } from "@/lib/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import type * as React from "react";
import { JobOpeningProvider } from "./(dashboard)/job-opening/job-opening.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <JobOpeningProvider>{children}</JobOpeningProvider>
    </QueryClientProvider>
  );
}
