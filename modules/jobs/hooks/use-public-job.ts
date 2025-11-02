import { publiJobContext } from "@/modules/jobs/components/public/job-opening-context";
import React from "react";

export function usePublicJob() {
  const ctx = React.useContext(publiJobContext);

  if (!ctx) {
    throw new Error(
      "usePublicJob must be used within a <PublicJobProvider />"
    );
  }

  return ctx;
}
