import { Suspense } from "react";
import { FooterApplyButton } from "@/modules/jobs/components/public/footer-apply-button";

export default function JobOpeningLayout(props: { children: React.ReactNode }) {
  return (
    <>
      {props.children}
      <Suspense>
        <FooterApplyButton />
      </Suspense>
    </>
  );
}
