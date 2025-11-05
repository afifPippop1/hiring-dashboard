"use client";

import { APPLICATION_FORM_FIELDS_BUILDER_OPTIONS } from "@/modules/applications";
import { JobApplicationChecklistItem } from "./job-application-checklist-item";

export function JobApplicationChecklistForm() {
  return (
    <div className="p-4 border border-neutral-30 rounded-md">
      <h3 className="text-md font-bold">
        Minimum Profile Information Required
      </h3>
      <section className="p-2">
        {APPLICATION_FORM_FIELDS_BUILDER_OPTIONS.map((item) => (
          <JobApplicationChecklistItem
            key={item.field}
            field={item.field}
            label={item.label}
            options={item.options}
          />
        ))}
      </section>
    </div>
  );
}
