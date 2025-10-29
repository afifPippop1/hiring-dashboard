import { ArrowLeftIcon } from "@/components/icons/arrow-left";
import { ApplicationForm } from "@/components/shared/application-form/application-form";
import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/routes";
import Link from "next/link";

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
              <ArrowLeftIcon />
            </Button>
          </Link>
          <h1 className="font-bold text-xl text-neutral-100">
            Apply Front End at Rakamin
          </h1>
        </div>
        <div className="px-6">
          <ApplicationForm />
        </div>
      </div>
    </div>
  );
}
