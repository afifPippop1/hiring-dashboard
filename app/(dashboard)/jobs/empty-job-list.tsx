"use client";

import { Button } from "@/components/ui/button";
import { EMPTY_JOB_ASSET } from "@/lib/assets";
import Image from "next/image";
import React from "react";
import { JobOpeningDialog } from "./job-opening-dialog";

export function EmptyJobList() {
  const [openModal, setOpenModal] = React.useState(false);
  function handleOpenModal() {
    setOpenModal(true);
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={EMPTY_JOB_ASSET}
          alt="empty-job-list"
          width={306}
          height={300}
          loading="eager"
        />
        <section className="text-center">
          <h1 className="text-heading-sm font-bold text-neutral-90">
            No job openings available
          </h1>
          <p className="text-lg text-neutral-90">
            Create a job opening now and start the candidate process.
          </p>
        </section>
        <Button variant="secondary" size="lg" onClick={handleOpenModal}>
          Create a new job
        </Button>
        <JobOpeningDialog onOpenChange={setOpenModal} open={openModal} />
      </div>
    </div>
  );
}
