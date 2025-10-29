import { UploadIcon } from "@/components/icons/upload";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { ApplicationFormSchema } from "@/lib/application_form/application-form.schema";
import { AVATAR_THUMBNAIL_ASSET } from "@/lib/assets";
import Image from "next/image";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CapturePhotoProfileDialog } from "./capture-photo-profile-dialog";

export function PhotoProfileForm(_: { required?: boolean }) {
  const { control } = useFormContext<ApplicationFormSchema>();
  const [openPhotoProfileDialog, setOpenPhotoProfileDialog] =
    React.useState(false);

  const handleOpenPhotoProfileDialog = () => {
    setOpenPhotoProfileDialog(true);
  };

  return (
    <Controller
      control={control}
      name="photo_profile"
      render={({ field, fieldState }) => (
        <Field>
          <section className="flex flex-col gap-2 items-start">
            <h3 className="font-bold">Photo Profile</h3>
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <Image
                src={field.value || AVATAR_THUMBNAIL_ASSET}
                width={128}
                height={128}
                alt="photo-profile"
                className="object-cover w-full h-full"
              />
            </div>
            <Button variant="outline" onClick={handleOpenPhotoProfileDialog}>
              <UploadIcon />
              Take a Picture
            </Button>
            <CapturePhotoProfileDialog
              open={openPhotoProfileDialog}
              onOpenChange={setOpenPhotoProfileDialog}
              onChange={field.onChange}
              photo={field.value}
            />
          </section>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
