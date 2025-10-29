"use client";

import { ArrowLeftIcon } from "@/components/icons/arrow-left";
import { UploadIcon } from "@/components/icons/upload";
import { Button } from "@/components/ui/button";
import { AVATAR_THUMBNAIL_ASSET } from "@/lib/assets";
import Image from "next/image";
import React from "react";
import { CapturePhotoProfileDialog } from "./capture-photo-profile-dialog";

export default function ApplyJobForm() {
  const [openPhotoProfileDialog, setOpenPhotoProfileDialog] =
    React.useState(false);

  const handleOpenPhotoProfileDialog = () => {
    setOpenPhotoProfileDialog(true);
  };

  return (
    <div className="flex justify-center">
      <div className="md:max-w-[700px] bg-neutral-10 w-full rounded-md p-10 flex flex-col items-stretch gap-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon-sm">
            <ArrowLeftIcon />
          </Button>
          <h1 className="font-bold text-xl text-neutral-100">
            Apply Front End at Rakamin
          </h1>
        </div>
        <div className="px-6">
          <section className="flex flex-col gap-2 items-start">
            <h3 className="font-bold">Photo Profile</h3>
            <Image
              src={AVATAR_THUMBNAIL_ASSET}
              width={128}
              height={128}
              alt="photo-profile"
            />
            <Button variant="outline" onClick={handleOpenPhotoProfileDialog}>
              <UploadIcon />
              Take a Picture
            </Button>
            <CapturePhotoProfileDialog
              open={openPhotoProfileDialog}
              onOpenChange={setOpenPhotoProfileDialog}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
