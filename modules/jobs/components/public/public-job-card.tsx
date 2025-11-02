"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatMinMaxSalary } from "@/lib/utils";
import { Job, JOB_SEARCH_PARAM } from "@/modules/jobs";
import { Banknote, BriefcaseBusiness } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function PublicJobCard({ job }: { job: Job }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQueryParam = () => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set(JOB_SEARCH_PARAM, job.id); // Set or update a parameter

    router.push(`?${currentParams.toString()}`);
  };

  const active = searchParams.get(JOB_SEARCH_PARAM) === job.id;

  return (
    <Card
      onClick={updateQueryParam}
      className={
        active
          ? "bg-primary-surface border-primary-hover border-2 cursor-pointer select-none"
          : "cursor-pointer select-none"
      }
    >
      <CardContent>
        <h1 className="font-bold text-xl">{job.title}</h1>
        <div className="mt-2 flex flex-col gap-2 text-neutral-80 text-sm">
          <section className="flex gap-1 items-center">
            <BriefcaseBusiness size="16px" />
            <p>{job.type}</p>
          </section>
          <section className="flex gap-1 items-center">
            <Banknote size="16px" />
            <p>
              {formatMinMaxSalary({ min: job.minSalary, max: job.maxSalary })}
            </p>
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
