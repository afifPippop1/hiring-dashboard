import { Suspense } from "react";
import { ApplyButton } from "../../../modules/jobs/components/public/apply-button";

export default function JobOpeningLayout(props: { children: React.ReactNode }) {
  return (
    <>
      {props.children}
      <Suspense>
        <ApplyButton />
      </Suspense>
    </>
  );
}
