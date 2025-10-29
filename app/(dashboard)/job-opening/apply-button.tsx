"use client";

import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams, useSelectedLayoutSegment } from "next/navigation";

export function ApplyButton() {
  const segment = useSelectedLayoutSegment();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("external_id");
  return (
    <div
      className={cn(
        "md:hidden absolute bottom-0 right-0 left-0 bg-neutral-10 p-2",
        segment === "apply-job" && "hidden"
      )}
    >
      <Link href={`${Routes.ApplyJob}/${jobId}`}>
        <Button className="w-full">Apply</Button>
      </Link>
    </div>
  );
}
