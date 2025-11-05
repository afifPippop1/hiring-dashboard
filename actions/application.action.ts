"use server";

import { supabaseBucket } from "@/lib/supabase/bucket";
import { createClient } from "@/lib/supabase/server";
import { dataURLtoFile } from "@/lib/utils";
import {
  ApplicationFormAttributes,
  ApplicationFormSchema,
  generateOrderedApplicationFields,
  submitApplicationOrder,
} from "@/modules/applications";
import { v4 as uuid } from "uuid";

export async function submitApplicationAction({
  jobId,
  photo_profile,
  ...formData
}: Partial<ApplicationFormSchema> & { jobId: string }) {
  const supabase = await createClient();
  if (photo_profile) {
    const file = dataURLtoFile(photo_profile, "photo.jpg");
    const { data, error } = await supabaseBucket.storage
      .from("profile-photos")
      .upload(`job-${jobId}-user-${uuid()}.jpg`, file, { upsert: true });
    // console.log(data, error);
    // if (error) {
    //   throw error;
    // }
  }

  const { data, error } = await supabase.from("applications").insert({
    job_id: jobId,
    attributes: generateOrderedApplicationFields(formData, submitApplicationOrder),
  });

  return { data, error };
}

export async function getApplicationsAction(jobId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("job_id", jobId)
    .order("created_at", { ascending: false });

  const normalizedData = data?.map((application) => {
    return {
      ...application,
      attributes: application.attributes as ApplicationFormAttributes[],
    };
  });

  return { data: normalizedData, error };
}
