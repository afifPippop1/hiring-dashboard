import { ApplicationForm } from "@/components/shared/application-form/application-form";
import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/routes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { JobTitle } from "./job-title";

export default async function ApplyJobForm(props: {
  params: { jobId: string };
}) {
  const params = await props.params;

  return (
    <div className="flex justify-center">
      <div className="md:max-w-[700px] bg-neutral-10 w-full rounded-md p-10 flex flex-col items-stretch gap-6">
        <div className="flex items-center gap-4">
          <Link href={`${Routes.JobOpening}?external_id=${params.jobId}`}>
            <Button variant="outline" size="icon-sm">
              <ArrowLeft color="#404040" />
            </Button>
          </Link>
          <JobTitle />
        </div>
        <div className="px-6">
          <ApplicationForm />
        </div>
      </div>
    </div>
  );
}
