import { JobForm } from "@/components/shared/job-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { ReactNode } from "react";

export function JobOpeningDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[80svh] flex flex-col p-0 gap-0">
        <DialogHeader className="border-b border-b-neutral-40 p-4">
          <DialogTitle>Job Opening</DialogTitle>
        </DialogHeader>
        <div className="overflow-auto px-4 py-4">
          <JobForm />
        </div>
        <DialogFooter className="border-t border-t-neutral-40 p-4">
          <Button>Publish Job</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
