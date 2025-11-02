import React from "react";
import { adminJobListContext } from "../components/admin/job-provider";

export function useAdminJobList() {
  const ctx = React.useContext(adminJobListContext);
  if (!ctx) {
    throw new Error(
      "useJobList must be used within a <AdminJobListProvider />"
    );
  }
  return ctx;
}
