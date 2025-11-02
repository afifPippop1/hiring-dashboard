"use client";

import {
  AdminJobListProvider,
  CreateJobCard,
  JobList,
  JobSearchInput,
} from "@/modules/jobs";

export default function Jobspage() {
  return (
    <AdminJobListProvider>
      <div className="flex items-start gap-6 h-full">
        <div className="flex-1 flex flex-col items-stretch gap-4 h-full">
          <JobSearchInput />
          <JobList />
        </div>
        <div className="sticky top-0 self-start">
          <CreateJobCard />
        </div>
      </div>
    </AdminJobListProvider>
  );
}
