import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { RECRUITE_BACKGROUND } from "@/lib/assets";
import React from "react";
import { JobOpeningDialog } from "./job-opening-dialog";

export function CreateJobCard() {
  const [openModal, setOpenModal] = React.useState(false);
  function handleOpenModal() {
    setOpenModal(true);
  }

  return (
    <Card
      style={{
        backgroundImage: `url(${RECRUITE_BACKGROUND})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CardContent className="flex flex-col justify-center items-center">
        <CardTitle className="text-white mb-1">
          Recruit the best candidates
        </CardTitle>
        <CardDescription className="text-neutral-10 font-bold mb-6">
          Create jobs, invite, and hire with ease
        </CardDescription>
        <Button onClick={handleOpenModal}>Create a new job</Button>
        <JobOpeningDialog onOpenChange={setOpenModal} open={openModal} />
      </CardContent>
    </Card>
  );
}
