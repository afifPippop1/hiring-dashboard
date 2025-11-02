"use client";

import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { EMPTY_JOB_ASSET } from "@/lib/assets";
import React from "react";
import { JobOpeningDialog } from "./create-job-dialog";

export function EmptyJobList() {
  const [openModal, setOpenModal] = React.useState(false);
  function handleOpenModal() {
    setOpenModal(true);
  }

  return (
    <EmptyState
      src={EMPTY_JOB_ASSET}
      title="No job openings available"
      description="Create a job opening now and start the candidate process."
    >
      <Button variant="secondary" size="lg" onClick={handleOpenModal}>
        Create a new job
      </Button>
      <JobOpeningDialog onOpenChange={setOpenModal} open={openModal} />
    </EmptyState>
  );
}
