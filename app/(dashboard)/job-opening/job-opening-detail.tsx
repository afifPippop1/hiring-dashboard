"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Routes } from "@/lib/routes";
import Link from "next/link";
import { useJobOpening } from "./job-opening.provider";
import { formatMinMaxSalary } from "@/lib/utils";
import { Banknote, BriefcaseBusiness } from "lucide-react";

export function JobOpeningDetail() {
  const { job } = useJobOpening();
  if (!job) return <></>;

  return (
    <div className="bg-neutral-10 border border-neutral-40 p-6 rounded-md">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2">
          <section className="flex flex-col gap-2">
            <Badge variant="success">{job.type}</Badge>
            <h1 className="text-xl font-bold">{job.title}</h1>
          </section>
        </div>
        <Link href={`${Routes.ApplyJob}/${job.id}`} className="hidden md:flex">
          <Button variant="secondary">Apply</Button>
        </Link>
      </div>
      <Divider className="my-6 w-full border-neutral-40" />

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
      <Divider className="my-6 w-full border-neutral-40" />
      <p>{job.descriptions}</p>
    </div>
  );
}
