import { UploadIcon } from "@/components/icons/upload";
import { Button } from "@/components/ui/button";
import { AVATAR_THUMBNAIL_ASSET } from "@/lib/assets";
import Image from "next/image";
import { CapturePhotoProfileDialog } from "./capture-photo-profile-dialog";
import React from "react";

export function PhotoProfileForm() {
  const [openPhotoProfileDialog, setOpenPhotoProfileDialog] =
    React.useState(false);

  const handleOpenPhotoProfileDialog = () => {
    setOpenPhotoProfileDialog(true);
  };

  return (
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
  );
}
