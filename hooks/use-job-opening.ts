import { JobOpeningContext } from "@/context/job-opening-context";
import React from "react";

export function useJobOpening() {
  const ctx = React.useContext(JobOpeningContext);

  if (!ctx) {
    throw new Error(
      "useJobOpening must be used within a <JobOpeningProvider />"
    );
  }

  return ctx;
}
