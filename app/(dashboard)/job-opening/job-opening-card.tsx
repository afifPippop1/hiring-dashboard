"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Job } from "@/lib/job/job.schema";
import { formatMinMaxSalary } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useJobOpening } from "./job-opening.provider";

export function JobOpeningCard({ job }: { job: Job }) {
  const jobOpening = useJobOpening();
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQueryParam = () => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("external_id", job.id); // Set or update a parameter

    // Use router.push or router.replace to update the URL
    router.push(`?${currentParams.toString()}`);
    // Or, to replace the current history entry:
    // router.replace(`?${currentParams.toString()}`);
  };
  console.log(jobOpening.job);

  return (
    <Card onClick={updateQueryParam}>
      <CardContent>
        <h1 className="font-bold text-xl">{job.title}</h1>
        <div className="mt-2 flex gap-2">
          <section className="flex-1">
            <p className="text-lg">
              {formatMinMaxSalary({ min: job.minSalary, max: job.maxSalary })}
            </p>
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
