"use client";

import { Badge } from "@/components/ui/badge";
import { useJobOpening } from "./job-opening.provider";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import Link from "next/link";

export function JobOpeningDetail() {
  const { job } = useJobOpening();
  if (!job) return <></>;

  return (
    <div className="bg-neutral-10 border border-neutral-40 p-6 rounded-md">
      <div className="flex items-start justify-between">
        <section className="flex flex-col gap-2">
          <Badge variant="success">{job.type}</Badge>
          <h1 className="text-xl font-bold">{job.title}</h1>
        </section>
        <Link href={`/job-opening/apply-job/${job.id}`}>
          <Button variant="secondary">Apply</Button>
        </Link>
      </div>
      <Divider className="my-6 w-full border-neutral-40" />
      <p>{job.descriptions}</p>
    </div>
  );
}
