import { ApplyButton } from "./apply-button";

export default function JobOpeningLayout(props: {
  children: React.ReactNode;
  params: { jobId: string };
}) {
  return (
    <>
      {props.children}
      <ApplyButton />
    </>
  );
}
